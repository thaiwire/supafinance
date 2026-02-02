"use client";
import { Button, Form, Input } from "antd";
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
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your Email to get reset link" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="mt-2">
          Send Reset Link
        </Button>
      </Form>
    </div>
  );
}

export default ResetPasswordPage;
