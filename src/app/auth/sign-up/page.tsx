"use client";

import { Button, Form, Input } from "antd";
import React from "react";

function SignUpPage() {
  const onSubmit = async (values: any) => {
    try {
      console.log("Form Values:", values);
    } catch (error) {
      console.error("Error during sign up:", error);
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
          <h1 className="text-xl font-bold uppercase">Sign Up</h1>
          <div className="flex gap-5 text-sm">
            Already have an account?{" "}
            <a href="/auth/sign-in" className="text-blue-500">
              Sign In
            </a>
          </div>
        </div>
        <hr />
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }
           
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="mt-2">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default SignUpPage;
