"use client";

import { createClient } from "@/config/supabase-browser-config";
import { Button, Form, Input, message } from "antd";
import React from "react";

function ForGotPasswordPage() {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const supabaseBrowserConfig = createClient();
      const { data, error } =
        await supabaseBrowserConfig.auth.resetPasswordForEmail(values.email, {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
        });
      if (error) {
        throw new Error(error.message);
      }
      message.success("Password reset link sent! Please check your email.");
      form.resetFields();

      console.log("Form Values:", values);
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
          <h1 className="text-xl font-bold uppercase">Forget Password</h1>
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

        <Button
          type="primary"
          htmlType="submit"
          className="mt-2"
          loading={loading}
        >
          Send Reset Link
        </Button>
      </Form>
    </div>
  );
}

export default ForGotPasswordPage;
