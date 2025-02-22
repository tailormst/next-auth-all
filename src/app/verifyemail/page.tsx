"use client";

import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get("token");
        if (urlToken) {
            setToken(urlToken);
        } else {
            setLoading(false);
        }
    }, []);

    const verifyUserEmail = useCallback(async () => {
        if (!token) return;

        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Verification Error:", error.message);
            } else {
                console.error("An unexpected error occurred while verifying the token.");
            }
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        verifyUserEmail();
    }, [verifyUserEmail]);

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    const goDash = () => {
        router.push("/dashboard");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-4">
            <h1 className="text-4xl font-semibold">Verify Email</h1>

            {loading && <h2 className="mt-4 p-2 bg-blue-500 text-white rounded-lg">Verifying...</h2>}

            {!loading && token && (
                <h2 className="mt-4 p-2 bg-orange-500 text-black rounded-lg">{token}</h2>
            )}

            {!loading && verified && (
                <div className="mt-6 text-center">
                    <h2 className="text-2xl text-green-600 font-semibold">Email Verified!</h2>
                    <button
                        onClick={logout}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                    <button
                        onClick={goDash}
                        className="block mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                    >
                        Go to Dashboard
                    </button>
                </div>
            )}

            {!loading && error && (
                <h2 className="mt-6 p-3 bg-red-500 text-white rounded-lg">
                    Verification Failed. Please try again.
                </h2>
            )}
        </div>
    );
}
