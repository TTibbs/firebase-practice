"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";

const SignupPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [signUpEmail, setSignUpEmail] = useState<string>("");
  const [signUpPassword, setSignUpPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  });

  const knownEmailProviders = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
  ];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return false;
    const emailParts = email.split("@");
    const domain = emailParts[1];
    if (!knownEmailProviders.includes(domain)) return false;
    return re.test(email);
  };

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateEmail(signUpEmail)) {
      setError("Invalid email address");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );
      const user = userCredential.user;
      console.log(user);
      await updateProfile(user, { displayName, photoURL });
      console.log("Profile updated:", user);
      await sendEmailVerification(user);
      console.log("Email verification sent!");
      router.push("/verify-email");
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col gap-3 min-h-screen items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col justify-center items-center gap-3 bg-zinc-200 p-28 rounded-lg text-zinc-800"
      >
        <label className="flex flex-col">
          Email
          <input
            className="text-zinc-800 w-auto p-2 rounded-lg mx-auto"
            type="email"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </label>
        <label className="flex flex-col">
          Password
          <input
            className="text-zinc-800 w-auto p-2 rounded-lg mx-auto"
            type="password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>
        <label className="flex flex-col">
          Display Name
          <input
            className="text-zinc-800 w-auto p-2 rounded-lg mx-auto"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your Display Name"
            required
          />
        </label>
        <label className="flex flex-col">
          Photo URL
          <input
            className="text-zinc-800 w-auto p-2 rounded-lg mx-auto"
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Your Photo URL"
          />
        </label>
        <button
          type="submit"
          className="w-auto py-2 px-3 rounded-lg text-zinc-100 font-bold bg-zinc-700 hover:bg-zinc-800 transition-all duration-300 ease-linear"
        >
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <Link href="/auth/login">
            <span className="decoration-2 underline text-zinc-600 hover:text-zinc-700 transition-all duration-300 ease-linear">
              Login
            </span>
          </Link>
        </p>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
};

export default SignupPage;
