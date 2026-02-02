"use client";

import React from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";

function SignInPage() {

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
          <h1 className="text-xl font-bold uppercase">Login</h1>
          <div className="flex gap-5 text-sm">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
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
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="mt-2">
          Log in
        </Button>
         <div className="flex justify-end">
          <Link href="/auth/forgot-password" className="text-blue-500 text-sm">
            Forgot Password?
          </Link>
          </div>    

      </Form>
    </div>
  );
}

export default SignInPage;
