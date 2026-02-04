import { createClient } from "@/config/supabase-browser-config";
import { IUser } from "@/interfaces";
import { Button, Input, message, Modal } from "antd";
import React from "react";

interface ChangePasswordModalProps {
  showChangePasswordModal: boolean;
  setShowChangePasswordModal: (show: boolean) => void;
  user: IUser | null;
  onSuccess: () => void;
}

function ChangePasswordModal({
  showChangePasswordModal,
  setShowChangePasswordModal,
  onSuccess,
  user,
}: ChangePasswordModalProps) {
  const [newpassword, setNewpassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSave = async () => {
    try {
      setLoading(true);
      const supabaseBrowserConfig = createClient();

      if (newpassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const { error } = await supabaseBrowserConfig.auth.updateUser({
        password: newpassword,
      });
      if (error) {
        throw new Error(error.message);
      }

      message.success("Password changed successfully");
       setShowChangePasswordModal(false);
       onSuccess();
    } catch (error: any) {
      message.error(error.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showChangePasswordModal}
      onCancel={() => setShowChangePasswordModal(false)}
      centered
      title="Change Password"
      footer={null}
    >
      <div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">New Password</label>
            <Input
              type="password"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-5">
          <Button
            onClick={() => setShowChangePasswordModal(false)}
            className="mt-4"
          >
            Cancel
          </Button>
          <Button type="primary" className="mt-4 w-full"
            loading={loading}
            onClick={onSave}
            disabled={!newpassword || !confirmPassword}
          >
            Change Password
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ChangePasswordModal;
