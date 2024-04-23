'use client'

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/EmptyOrg";
import Navbar from "./_components/Navbar";

export default function Dashboard() {
  const { organization } = useOrganization()

  return (
    <section className="min-h-screen">
      <Navbar />
      <div className="flex-1 h-[calc(100vh-80px)] p-6">
        {
          !organization
            ? <EmptyOrg />
            : <div>hello</div>
        }
      </div>
    </section>
  )
}
