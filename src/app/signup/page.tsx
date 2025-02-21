"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "", username: "" });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setButtonDisabled(!(user.email.trim() && user.password.trim() && user.username.trim()));
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            toast.success("Signup successful! Please login.");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Signup failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800">
                    {loading ? "Processing..." : "Signup"}
                </h1>
                <hr className="my-4" />

                <div className="space-y-4">
                    {["username", "email", "password"].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                id={field}
                                type={field === "password" ? "password" : "text"}
                                value={user[field as keyof typeof user]}
                                onChange={handleInputChange}
                                placeholder={`Enter your ${field}`}
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    ))}

                    <button
                        onClick={onSignup}
                        disabled={buttonDisabled}
                        className={`w-full px-4 py-2 font-semibold text-white rounded-lg transition ${
                            buttonDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                </div>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
