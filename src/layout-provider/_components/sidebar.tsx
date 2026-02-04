import { Button, Drawer, message } from "antd";
import React from "react";
import { Home, User, Settings, List, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/config/supabase-browser-config";

function SideBar({
  openSidebar,
  setOpenSidebar,
}: {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const iconSize = 14;
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const menuItems = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      href: "/",
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      href: "/profile",
    },
    {
      name: "Transactions",
      icon: <List size={iconSize} />,
      href: "/transactions",
    },
    {
      name: "Settings",
      icon: <Settings size={iconSize} />,
      href: "/settings",
    },
  ];

  const handleLogout = async () => {
    try {
      setLoading(true);
      const supabaseBrowserConfig = createClient();
      const { error } = await supabaseBrowserConfig.auth.signOut();
      if (error) {
        throw new Error(error.message);
      } else {
        message.success("Logged out successfully!");
        router.push("/auth/sign-in");
      }
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={openSidebar} onClose={() => setOpenSidebar(false)} size={350}>
      <div className="p-5">
        <h1 className="font-bold text-2xl mb-10">Menu</h1>
        <div className="flex flex-col gap-5">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-5 p-3 rounded-lg cursor-pointer hover:bg-gray-200 ${pathname === item.href ? "bg-gray-300" : ""}`}
              onClick={() => {
                router.push(item.href);
                setOpenSidebar(false);
              }}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </div>
          ))}
          <Button type="primary" loading={loading} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default SideBar;
