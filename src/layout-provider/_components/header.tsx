import { IUser } from "@/interfaces";
import { Menu } from "lucide-react";
import React from "react";
import SideBar from "./sidebar";

function Header({ user }: { user: IUser }) {
  const [openSidebar, setOpenSidebar] = React.useState(false);
  

  return (
    <div className="p-5 bg-primary flex justify-between items-center">
      <h1 className="text-white font-bold text-2xl">NEXTJ SAPA FINANCE</h1>
      <div className="flex gap-5 items-center">
        <h1 className="text-white text-sm">? Hello, {user.profile.name}</h1>
        <Menu
            className="text-white cursor-pointer"
            size={20}
            onClick={() => setOpenSidebar(true)}
         />
      </div>
      {openSidebar && (
        <SideBar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}        
        />
      )}
     </div>
  );
}

export default Header;
