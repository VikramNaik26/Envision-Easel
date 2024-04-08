import { OrgSidebar } from "./_components/OrgSidebar"
import Sidebar from "./_components/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full">
      <Sidebar />
      <section className="h-full pl-16">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          <div className="h-full flex-1">
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}

export default DashboardLayout
