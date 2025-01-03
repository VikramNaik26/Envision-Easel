import { v } from 'convex/values'

import { mutation, query } from './_generated/server'

const images: string[] = [
  '/placeholders/1.svg',
  '/placeholders/2.svg',
  '/placeholders/3.svg',
  '/placeholders/4.svg',
  '/placeholders/5.svg',
  '/placeholders/6.svg',
  '/placeholders/7.svg',
  '/placeholders/8.svg',
  '/placeholders/9.svg',
  '/placeholders/10.svg',
]

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthorized')
    }

    const randomImage = images[Math.floor(Math.random() * images.length)]

    const easel = await ctx.db.insert('boards', {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    })

    return easel
  }
})

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const userId = identity.subject
    const existingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_user_board', (q) =>
        q
          .eq('userId', userId)
          .eq('boardId', args.id)
      )
      .unique()

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id)
    }

    await ctx.db.delete(args.id)
  }
})

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const title = args.title.trim()

    if (!title) {
      throw new Error("Title is required")
    }

    if (title.length > 60) {
      throw new Error("Title cannot be longer than 60 characters")
    }

    const easel = await ctx.db.patch(args.id, {
      title: args.title
    })

    return easel
  }
})

export const favorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    console.log(args)

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const easel = await ctx.db.get(args.id)

    if (!easel) {
      throw new Error("Easel not found")
    }

    const userId = identity.subject

    const existingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_user_board', (q) =>
        q
          .eq('userId', userId)
          .eq('boardId', easel._id)
      )
      .unique()

    if (existingFavorite) {
      throw new Error('Board Already Favorited')
    }

    await ctx.db.insert('userFavorites', {
      userId,
      orgId: args.orgId,
      boardId: easel._id
    })

    return easel
  }
})

export const unfavorite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const easel = await ctx.db.get(args.id)

    if (!easel) {
      throw new Error("Easel not found")
    }

    const userId = identity.subject

    const existingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_user_board', (q) =>
        q
          .eq('userId', userId)
          .eq('boardId', easel._id)
      )
      .unique()

    if (!existingFavorite) {
      throw new Error('Favorited board not found')
    }

    await ctx.db.delete(existingFavorite._id)

    return easel
  }
})

export const get = query({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const easel = await ctx.db.get(args.id)

    return easel
  }
})
