import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen">
      <h3>This is page for authenticated users</h3>
      <div>
        <UserButton />
      </div>
    </main>
  )
}
