import { createClient } from "@/config/supabase-server-config";
import React from "react";

async function ProfilePage() {
 
  const supabaseServerConfig = await createClient();
  
  const { data, error } = await supabaseServerConfig.auth.getUser();
  let user = null;
  if (data) {
    console.log("user data", data);

    const userProfileResponse = await supabaseServerConfig
      .from("user_profiles")
      .select("*")
      .eq("id", data.user?.id)
      .single();

    user = {
      ...data?.user,
      profile: userProfileResponse.data,
    };
  } else {
    console.error("Error fetching user:", error);
  }

  return (
    <div className="p-5 flex flex-col gap-5 w-max">
      <h1 className="font-bold">Welcome to Profile Page</h1>
      {user && (
        <div className="flex flex-col gap-2">
          <h1>User Id : {user.id}</h1>
          <h1>Email : {user.email}</h1>
          <h1>User Profile : {user.profile?.name}</h1>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
