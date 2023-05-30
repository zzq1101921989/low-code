import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <div>头部内容</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

