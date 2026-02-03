"use server";

import { createClient } from "@/config/supabase-server-config";


export const resetuserPassword = async (code = "", password = "") => {
  try {
    const supabaseServerConfig = await createClient();

    // get the temp user session using the code
    const { data, error } =
      await supabaseServerConfig.auth.exchangeCodeForSession(code);

    if (error) {
      throw new Error(error.message);
    }

    // update the user's password
    const { error: updateError } = await supabaseServerConfig.auth.updateUser({
      password: password,
    });

    if (updateError) {
      throw new Error(updateError.message);
    }
    return { 
         Success: true,
         message: "Password reset successfully" 
    };
    
  } catch (error: any) {
    return {
      Success: false,
      message: error.message,
    };
  } finally {
  }
};

export const getLoggedInuser = async () => {
  try {
    const supabaseServerConfig = await createClient();

    const authResponse = await supabaseServerConfig.auth.getUser();  
    if (authResponse.error) {
      throw new Error(authResponse.error.message);
    }
    
    const userProfileResponse = await supabaseServerConfig
      .from("user_profiles")
      .select("*")
      .eq("id", authResponse.data.user?.id)
      .single();
    if (userProfileResponse.error) {
      throw new Error(userProfileResponse.error.message);
    }
    const user = {
      ...authResponse.data.user,
      profile: userProfileResponse.data,
    }
    return { 
      Success: true,
      data: user 
    };
    
  } catch (error:any) {
    return {
      Success: false,
      message: error.message,
    };
  }
};
