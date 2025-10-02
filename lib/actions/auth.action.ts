// lib/actions/auth.action.ts
"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7; // seconds

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead.",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "User created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating user", error);
    return {
      success: false,
      message: "Failed to create user. Please try again later.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    // ensure user exists in admin
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account instead.",
      };
    }

    // create + set session cookie
    const cookieSet = await setSessionCookie(idToken);
    if (!cookieSet) {
      return {
        success: false,
        message: "Failed to create session cookie.",
      };
    }

    return {
      success: true,
      message: "Signed in and session cookie set.",
    };
  } catch (error: any) {
    console.error("signIn error:", error);
    return {
      success: false,
      message: error?.message ?? "Failed to login to an account.",
    };
  }
}

/**
 * Set the session cookie (returns true if success or false on failure)
 */
export async function setSessionCookie(idToken: string) {
  try {
    // cookies() is async in some typings - await it
    const cookieStore = await cookies();

    // expiresIn must be in milliseconds for createSessionCookie
    const expiresInMs = ONE_WEEK * 1000;

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: expiresInMs,
    });

    // set cookie (maxAge expects seconds)
    cookieStore.set({
      name: "session",
      value: sessionCookie,
      maxAge: ONE_WEEK,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return true;
  } catch (error) {
    console.error("setSessionCookie error:", error);
    return false;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userRecord.exists) return null;

    return {
      ...(userRecord.data() as object),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}