export const Toolbar = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <ul className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md list-none">
        <li>Pencil</li>
        <li>Circle</li>
        <li>Sqaure</li>
        <li>Ellipse</li>
      </ul>
      <ul className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md list-none">
        <li>Undo</li>
        <li>Redo</li>
      </ul>
    </div>
  )
}

export function ToolbarSkeleton() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] rounded-md shadow-md" />
  )
}
