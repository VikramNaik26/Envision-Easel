import { List } from "./List"
import NewButton from "./new-button"

const Sidebar = () => {
  return (
    <aside className="fixed z-[1] text-white left-0 bg-blue-950 h-full w-16 flex flex-col px-3 py-3 gap-y-4">
      <List />
      <NewButton />
    </aside>
  )
}

export default Sidebar
