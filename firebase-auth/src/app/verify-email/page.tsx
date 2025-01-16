"use client";

import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";

const Verify: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          setMessage("Your email has been verified! You can now log in.");
          router.push("/dashboard");
        } else {
          setMessage("Please check your email for a verification link.");
        }
      } else {
        setMessage("You are not logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="flex flex-col gap-3 min-h-screen items-center justify-center">
      <p>{message} Refresh the page once you have verified.</p>
    </section>
  );
};

export default Verify;
