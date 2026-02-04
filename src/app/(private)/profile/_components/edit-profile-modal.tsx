import { createClient } from "@/config/supabase-browser-config";
import { uploadFileAndGetURL } from "@/helpers/storage-helpers";
import { IUser } from "@/interfaces";

import { Button, Input, message, Modal, Upload } from "antd";
import React from "react";

interface EditProfileModalProps {
  showEditProfileModal: boolean;
  setShowEditProfileModel: (value: boolean) => void;
  user: IUser;
  onSuccess: () => void;
}

function EditProfileModal({
  showEditProfileModal,
  setShowEditProfileModel,
  user,
  onSuccess,
}: EditProfileModalProps) {
  const [name, setName] = React.useState(user.profile.name);
  const [selectFile, setSelectFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSave = async () => {
    try {
      setLoading(true);
      let newProfilePicUrl = user.profile.profile_pic;
      if (selectFile) {
        // upload new profile pic and get URL
        const response = await uploadFileAndGetURL(selectFile);
        if (!response.success) {
          throw new Error(
            response.message || "Failed to upload profile picture",
          );
        }
        newProfilePicUrl = response.data;
      }

      const supabaseBrowserConfig = createClient();
      const { data, error } = await supabaseBrowserConfig
        .from("user_profiles")
        .update({
          name: name,
          profile_pic: newProfilePicUrl,
        })
        .eq("id", user.id);
      if (error) {
        throw new Error(error.message);
      }
      message.success("Profile updated successfully");
      setShowEditProfileModel(false);
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showEditProfileModal}
      onCancel={() => setShowEditProfileModel(false)}
      title="Edit Profile"
      centered
      footer
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="profile-pic">Profile Picture</label>
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setSelectFile(file);
              return false;
            }}
            onRemove={() => {
              setSelectFile(null);
            }}
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-5"
          >
            <span className="text-gray-500 text-xs">
              Upload your profile picture
            </span>
          </Upload>
        </div>
        <div className="flex justify-end gap-5">
          <Button onClick={() => setShowEditProfileModel(false)}>Cancel</Button>
          <Button
            type="primary"
            disabled={!name.trim() || !selectFile}
            loading={loading}
            onClick={onSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
