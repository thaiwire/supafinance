"use client";
import { resetuserPassword } from "@/actions/users";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use } from "react";

function ResetPasswordPage() {
   const [loading, setLoading] = React.useState(false);
   const [form] = Form.useForm();
   const searchParams = useSearchParams();  
   const router = useRouter();

   const code = searchParams.get("code"); 
  
  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      if (values.password !== values.confirmPassword) {
        message.error("Passwords do not match");
        return;
      } 


      const response = await resetuserPassword(code!, values.password);
      if (response.Success) {
         message.success(response.message);
         form.resetFields();
          router.push("/");
      } else {
          message.error(response.message);
      }

      console.log("Resetting password with values:", values);
    } catch (error) {
      console.error("Error during sign in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center auth-parent h-screen">
      <Form
        className="bg-white p-5 flex flex-col gap-2 w-[400px]"
        layout="vertical"
        onFinish={onSubmit}
        form={form}
      >
        <div>
          <h1 className="text-xl font-bold uppercase">Reset Password</h1>
        </div>
        <hr />

        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { required: true, message: "Please input your new password!" },
          ]}
        >
          <Input type="password" placeholder="Enter your new password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your password!" },
          ]}
        >
          <Input type="password" placeholder="Confirm your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="mt-2"
          loading={loading}>
          Reset Password
        </Button>

        <div className="flex justify-end">
          <Link href="/auth/sign-in" className="text-blue-500">
            Back to Sign In
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default ResetPasswordPage;
