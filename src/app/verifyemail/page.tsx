"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get("token");
        if (urlToken) {
            setToken(urlToken);
        } else {
            setLoading(false);
        }
    }, []);

    // ✅ Memoizing the function to prevent useEffect from complaining
    const verifyUserEmail = useCallback(async () => {
        if (!token) return;

        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (err: any) {
            console.error("Verification Error:", err.response?.data || err.message);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        verifyUserEmail();
    }, [verifyUserEmail]);

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
                    <Link href="/login" className="block mt-4 text-blue-600 hover:underline">
                        Login Here
                    </Link>
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
