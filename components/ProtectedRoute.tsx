"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!user) {
    
    return null; // Or a loading/redirecting message
  }

  return <>{children}</>;
}