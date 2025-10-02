"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ReactNode } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <nav className="fixed top-0 left-0 flex flex-col items-start p-4 gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={38} height={32} />
            <h2 className="text-primary-100 font-semibold">SkyPath</h2>
          </Link>
        </nav>

        <main className="pt-20">{children}</main>
      </div>
    </ProtectedRoute>
  )
}

export default RootLayout