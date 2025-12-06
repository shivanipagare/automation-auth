"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

      const handleLogin = async () => {
        setError("");
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            console.log(error);
        } else {
         
            try {
                await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                     body: JSON.stringify({
                        email: email,
                        loginAt: new Date().toISOString(),
                    }),
                });
            } catch (err) {
                console.error("Failed to trigger n8n:", err);
            }

            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl font-semibold text-center mb-5">Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="border w-full p-2 rounded mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border w-full p-2 rounded mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                    onClick={handleLogin}
                >
                    Login
                </button>

                {error && <p className="text-red-600 mt-3 text-center">{error}</p>}

                <p className="text-center mt-4 text-sm">
                    Don’t have an account?{" "}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
