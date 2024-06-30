import { Outlet } from "react-router-dom";
import Sidebar from "../components/sideBar";

function Main() {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between bg-slate-200">
      <div className="w-full md:w-[5%] h-[10vh] md:h-screen bg-white z-10">
        <Sidebar />
      </div>
      <div className="w-full md:w-[95%] h-[90vh] md:h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
