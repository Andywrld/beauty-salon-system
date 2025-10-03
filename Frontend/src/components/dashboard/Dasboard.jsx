import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect } from "react";

const Dasboard = () => {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return (
    <div className="flex h-screen bg-jetBlack text-lightGray">
      {/* Sidebar */}
        <Sidebar />
      {/* Contenido principal */}
      <div className="flex-1 p-6 overflow-auto">
          <Outlet />  {/* Aquí se renderizan las páginas dinámicamente */}
      </div>
    </div>
);
};

export default Dasboard;
