'use client'

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/EmptyOrg";
import Navbar from "./_components/Navbar";
import { BoardList } from "./_components/BoardList";

interface DashboardProps {
  searchParams: {
    search?: string
    favorites?: string
  }
}

export default function Dashboard({ searchParams }: DashboardProps) {
  const { organization } = useOrganization()

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
