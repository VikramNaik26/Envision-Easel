import { auth, currentUser } from "@clerk/nextjs/server"
import { Liveblocks } from "@liveblocks/node"
import { ConvexHttpClient } from "convex/browser"

import { api } from "@/convex/_generated/api"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET!,
})

export async function POST(req: Request) {
  const { orgId } = await auth()
  const user = await currentUser()

  if (!orgId && !user) {
    return new Response("Unauthorized", { status: 403 })
  }

  const { room } = await req.json()
  const board = await convex.query(api.easel.get, { id: room })

  if (board?.orgId !== orgId) {
    return new Response("Unauthorized", { status: 403 })
  }

  const userInfo = {
    name: user?.firstName || "Anonymous",
    picture: user?.imageUrl,
  }

  if (user) {
    const session = liveblocks.prepareSession(
      user.id,
      { userInfo }
    )

    if (room) {
      session.allow(room, session.FULL_ACCESS)
    }

    const { status, body } = await session.authorize()
    return new Response(body, { status })
  }
}
