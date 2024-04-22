'use client'

import { UserButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <nav className="flex items-center gap-x-4 p-5 bg-green-500">
      <div className="hidden lg:flex lg:flex-1">
        { /* TODO: Add Search */}
      </div>
      <UserButton />
    </nav>
  )
}

export default Navbar
