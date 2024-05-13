'use client'

import { useOthers, useSelf } from "@/liveblocks.config"
import { UserAvatar } from "./UserAvatar"
import { connectionIdToColor } from "@/lib/utils"

const MAX_SHOWN_OTHER_USER = 1

export const Participants = () => {
  const users = useOthers()
  const currentUser = useSelf()
  const hasMoreUsers = users.length > MAX_SHOWN_OTHER_USER

  return (
    <div className="absolute top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_OTHER_USER).map(({ connectionId, info }) => (
          <UserAvatar
            borderColor={connectionIdToColor(connectionId)}
            key={connectionId}
            src={info?.picture}
            name={info?.name}
            fallback={info?.name?.[0] || "A"}
          />
        ))}

        {currentUser &&
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (you)`}
            fallback={currentUser.info?.name?.[0] || "A"}
          />
        }

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_OTHER_USER} more`}
            fallback={`+${users.length - MAX_SHOWN_OTHER_USER}`}
          />
        )}
      </div>
    </div>
  )
}

export function ParticipantsSkeleton() {
  return (
    <div className="absolute top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md w-[100px]" />
  )
}
