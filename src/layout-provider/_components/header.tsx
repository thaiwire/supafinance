import { IUser } from "@/interfaces";
import { Menu } from "lucide-react";
import React from "react";

function Header({ user }: { user: IUser }) {
  return (
    <div className="p-5 bg-primary flex justify-between items-center">
      <h1 className="text-white font-bold text-2xl">NEXTJ SAPA FINANCE</h1>
      <div className="flex gap-5 items-center">
        <h1 className="text-white text-sm">? Hello, {user.profile.name}</h1>
        <Menu
            className="text-white cursor-pointer"
            size={20}
         />
      </div>
    </div>
  );
}

export default Header;
