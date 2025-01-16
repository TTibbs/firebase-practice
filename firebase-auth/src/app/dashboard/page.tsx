"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1>Welcome to the Dashboard</h1>
      <p>This is a protected page. You are logged in.</p>
    </section>
  );
};

export default Dashboard;
