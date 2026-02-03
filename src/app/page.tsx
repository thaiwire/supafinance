"use client";

import { createClient } from "@/config/supabase-browser-config";
import { Button, message } from "antd";

import React from "react";
import { useRouter } from "next/navigation";

function HomePage() {
  const [loading, setLoading] = React.useState(false);

  const [user, setUser] = React.useState<any>(null);

  const router = useRouter();

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

  const getUser = async () => {
    try {
      setLoading(true);
      const supabaseBrowserConfig = createClient();
      const { data, error } = await supabaseBrowserConfig.auth.getUser();
      if (error) {
        throw new Error(error.message);
      }
      const userProfileResponse = await supabaseBrowserConfig
        .from("user_profiles")
        .select("*")
        .eq("id", data.user?.id)
        .single();
     
        console.log("userProfileResponse", userProfileResponse.data);


      setUser({
        ...data?.user,
        profile:userProfileResponse.data,
      });
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="p-5 flex flex-col gap-5 w-max">
      <h1 className="font-bold">Welcome to HomePage</h1>
      {user && (
        <div className="flex flex-col gap-2">
          <h1>User Id : {user.id}</h1>
          <h1>Email : {user.email}</h1>
          <h1>User Profile : {user.profile?.name}</h1>
        </div>
      )}
      <Button type="primary" loading={loading} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default HomePage;
