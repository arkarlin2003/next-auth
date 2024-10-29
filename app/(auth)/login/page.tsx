import CardWrapper from "@/components/auth/card-wrapper";
import GuestLayout from "@/components/auth/guest-layout";
import LoginForm from "@/components/auth/login-form";
import React from "react";

const LoginPage = () => {
  return (
    <GuestLayout>
      <CardWrapper
        title="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonUrl="/register"
      >
        <LoginForm />
      </CardWrapper>
    </GuestLayout>
  );
};

export default LoginPage;
