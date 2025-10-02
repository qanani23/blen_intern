"use client"

import dynamic from 'next/dynamic'
import React from 'react'

const AuthForm = dynamic(() => import('@/components/AuthForm'), { ssr: false })

const AuthFormWrapper = ({ type }: { type: 'sign-in' | 'sign-up' }) => {
  return <AuthForm type={type} />
}

export default AuthFormWrapper