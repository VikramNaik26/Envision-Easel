import { v } from 'convex/values'
import { query } from './_generated/server'

export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthorized')
    }

    const easels = await ctx.db
      .query('boards')
      .withIndex('by_org', (q) => q.eq('orgId', args.orgId))
      .order('desc')
      .collect()

    const boardsWithFavoriteRelation = easels.map(async (easel) => {
      return ctx.db
        .query('userFavorites')
        .withIndex('by_user_board', (q) =>
          q
            .eq('userId', identity.subject)
            .eq('boardId', easel._id)
        )
        .unique()
        .then((favorite) => {
          return {
            ...easel,
            isFavorite: !!favorite,
          }
        })
    })

    const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation)
    return boardsWithFavoriteBoolean
  }
})
