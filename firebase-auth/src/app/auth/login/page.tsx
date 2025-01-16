"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [signInEmail, setSignInEmail] = useState<string>("");
  const [signInPassword, setSignInPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInEmail,
        signInPassword
      );
      const user = userCredential.user;
      console.log(user);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col justify-center items-center gap-3 bg-zinc-200 p-28 rounded-lg text-zinc-800"
      >
        <label className="flex flex-col">
          Email
          <input
            className="text-zinc-800 w-auto p-2 mx-auto rounded-lg"
            type="email"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </label>
        <label className="flex flex-col">
          Password
          <input
            className="text-zinc-800 w-auto p-2 mx-auto rounded-lg"
            type="password"
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>
        <button
          type="submit"
          className="w-auto py-2 px-3 rounded-lg text-zinc-100 font-bold bg-zinc-700 hover:bg-zinc-800 transition-all duration-300 ease-linear"
        >
          Sign In
        </button>
        <p>
          Don't have an account?{" "}
          <Link href="/auth/signup">
            <span className="decoration-2 underline text-zinc-600 hover:text-zinc-700 transition-all duration-300 ease-linear">
              Sign Up
            </span>
          </Link>
        </p>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
};

export default LoginPage;
