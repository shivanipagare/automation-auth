"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
        <p className="text-gray-600 mb-6">
          Sign in to continue to your dashboard.
        </p>

        <Link
          href="/login"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition block"
        >
          Sign In
        </Link>

        <p className="text-gray-600 mt-4 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
