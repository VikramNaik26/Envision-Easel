'use client'

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/EmptyOrg";
import Navbar from "./_components/Navbar";
import { BoardList } from "./_components/BoardList";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const { organization } = useOrganization()
  const params = useSearchParams()

  const search = params.get('search')
  const favorites = params.get('favorites')

  const searchParams = (search || favorites) ? {
    ...(search && { search }),
    ...(favorites && { favorites })
  } : {}

  return (
    <section className="min-h-screen">
      <Navbar />
      <div className="flex-1 h-[calc(100vh-80px)] p-6">
        {
          !organization
            ? <EmptyOrg />
            : (
              <BoardList
                orgId={organization.id}
                query={searchParams}
              />
            )
        }
      </div>
    </section>
  )
}
