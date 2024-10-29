import CardWrapper from '@/components/auth/card-wrapper'
import GuestLayout from '@/components/auth/guest-layout'
import RegisterForm from '@/components/auth/register-form'
import React from 'react'

const RegisterPage = () => {
  return (
    <GuestLayout>
    <CardWrapper
      title="Create New Account"
      backButtonLabel="Already have an account?"
      backButtonUrl="/login"
    >
      <RegisterForm/>
    </CardWrapper>
  </GuestLayout>
  )
}

export default RegisterPage