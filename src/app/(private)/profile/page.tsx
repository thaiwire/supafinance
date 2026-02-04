"use client";

import { getLoggedInuser } from "@/actions/users";
import { IUser } from "@/interfaces";
import { Button, message } from "antd";
import { Loader } from "lucide-react";
import React from "react";
import EditProfileModal from "./_components/edit-profile-modal";
import ChangePasswordModal from "./_components/change-password-modal";

function ProfilePage() {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showEditProfileModal, setShowEditProfileModal] = React.useState<boolean>(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = React.useState<boolean>(false);


  const fetchUser = async () => {
    try {
      setLoading(true);
      const response: any = await getLoggedInuser();

      if (response.Success) {
        console.log("User data:", response.data);
        setUser(response.data);
      }
    } catch (error: any) {
      message.error(error.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  const renderUserProperty = (label: string, value: string) => {
    try {
      return (
        <div className="flex flex-col">
          <span className="text-xs uppercase text-gray-600">{label}</span>
          <span className="text-sm font-semibold">{value}</span>
        </div>
      );
    } catch (error: any) {
      return <></>;
    }
  };

  if (loading) {
    return (
      <div>
        <Loader className="animate-spin" />
      </div>
    );
  }

  let dummyProfilePic =
    "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png";

  return (
    <div>
      <h1 className="text-xl font-bold">User Profile</h1>
      <div className="grid grid-cols-4 mt-5 gap-5">
        <div
          className="col-span-1 flex flex-col justify-center items-center p-5 rounded-sm border border-gray-300
        "
        >
          <img
            src={user?.profile.profile_pic || dummyProfilePic}
            alt=""
            className="rounded-full mb-3 w-32 h-32 object-cover"
          />
          <h1 className="text-lg uppercase font-semibold">
            {user?.profile.name || "No Name Provided"}
          </h1>
        </div>
        <div className="col-span-3 p-5 border border-gray-300 rounded-sm grid grid-cols-3">
          {renderUserProperty("ID", user?.id || "N/A")}
          {renderUserProperty("Username", user?.profile.name || "N/A")}
          {renderUserProperty("Email", user?.email || "N/A")}

          {renderUserProperty("Create At", user?.create_at || "N/A")}
          {renderUserProperty(
            "Email Verified At",
            user?.email_comfirmed_at || "N/A",
          )}
          {renderUserProperty("Update At", user?.updated_at || "N/A")}
        </div>
      </div>
      <div className="flex justify-end mt-5 gap-3">
        <Button type="primary"
          onClick={() => setShowEditProfileModal(true)}
        >Edit Profile</Button>
        <Button type="primary"
          onClick={() => setShowChangePasswordModal(true)}
        >Change Password</Button>
      </div>
     
      {showEditProfileModal && user && (
        <EditProfileModal
          showEditProfileModal={showEditProfileModal}
          setShowEditProfileModel={setShowEditProfileModal}
          user={user!}
          onSuccess={fetchUser}          
        />
      )}

      {showChangePasswordModal && user && (
        <ChangePasswordModal
          showChangePasswordModal={showChangePasswordModal}
          setShowChangePasswordModal={setShowChangePasswordModal}
          user={user!}
          onSuccess={fetchUser}
        />
      )}
    </div>
  );
}

export default ProfilePage;
