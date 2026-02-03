"use client";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import React from "react";

function ResetPasswordPage() {
  const onSubmit = async (values: any) => {
    try {
      console.log("Form Values:", values);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center auth-parent h-screen">
      <Form
        className="bg-white p-5 flex flex-col gap-2 w-[400px]"
        layout="vertical"
        onFinish={onSubmit}
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

        <Button type="primary" htmlType="submit" className="mt-2">
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
