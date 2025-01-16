"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import Link from "next/link";

const Nav = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const userInitials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((word: string) => word[0])
        .join("")
        .toUpperCase()
    : "";

  console.log(userInitials);

  return (
    <nav className="flex items-center">
      <ul className="flex items-center justify-center gap-3">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        {!user && (
          <li>
            <Link href={"/auth/login"}>Login</Link>
          </li>
        )}
        {user && (
          <>
            <li>
              <Link href={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li className="border-2 border-zinc-200 rounded-full w-8 h-8 flex items-center justify-center text-sm">
              {userInitials}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
