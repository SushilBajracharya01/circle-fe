import MainFeed from "../../components/@Feed/MainFeed/MainFeed";

export default function Feed() {
  return (
    <div className="grid grid-cols-12 md:gap-4">
      <div className="hidden md:block col-span-3 lg:col-span-2 bg-green-50">Sidebar</div>
      <div className="col-span-12 md:col-span-6 lg:col-span-8 bg-red-50">
        <MainFeed />
      </div>
      <div className="hidden md:block col-span-3 lg:col-span-2 bg-blue-50">Sidebar</div>
    </div>
  )
}