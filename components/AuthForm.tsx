"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import{toast} from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signUp } from "@/lib/actions/auth.action"

type FormType = 'sign-in' | 'sign-up';

const authformschema = (type:FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }) : z.string().optional(),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),  })
}

const AuthForm = ({type}:{type:FormType}) => {
   const router = useRouter();
   const formSchema = authformschema(type);

   // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:""

    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name || "New User",
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message || "Sign up failed.");
          return;
        }

        toast.success("Account created successfully! Please sign in.");
        router.push("/sign-in");
      } else {
        // sign-in branch
        const { email, password } = values;

        // sign in with firebase client SDK
        await signInWithEmailAndPassword(auth, email, password);

        toast.success("Signed in successfully!");
        router.push("/");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(`There was an error: ${String(error)}`);
    }
  }



  const isSignIn = type === "sign-in"
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
             <Image src="/logo.svg" alt="logo" width={38} height={32}/>
             <h2 className="text-primary-100">
              SkyPath
             </h2>
        </div>
             <h3>Practice Job Interview With AI</h3>
      
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">

       {!isSignIn && (
       <FormField 
       control={form.control} 
        name="name"
        label="Name"
        placeholder="Your Name" />
       )}

        <FormField 
       control={form.control} 
        name="email"
        label="Email"
        placeholder="Your Email Address"
        type="email" />

        <FormField 
       control={form.control} 
        name="password"
        label="Password"
        placeholder="Your Password"
        type="password" />
        <Button className="btn" type="submit">{isSignIn ? "Sign In" : "create an account"}</Button>
      </form>
    </Form>

    <p className="text-center">
       {isSignIn ? "Don't have an account?" : "Already have an account?"}
       <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1">
       {!isSignIn ? "Sign In" : "Sign Up"}
       </Link>
    </p>
    </div>
    </div>
  )
}

export default AuthForm