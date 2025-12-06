"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }

      setLoading(false);
    }

    loadUser();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) return null; // Safety fallback

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow max-w-sm w-full text-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-4 text-lg">Welcome, {user.email}</p>
        <button
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
