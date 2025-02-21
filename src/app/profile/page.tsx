"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetchingUser, setFetchingUser] = useState(false);

    const getUserDetails = async () => {
        try {
            setFetchingUser(true);
            const response = await axios.get("/api/users/me");
            console.log("User Data:", response.data);
            setData(response.data.data._id);
            toast.success("User data fetched successfully!");
        } catch (error: unknown) {
            console.error("Failed to fetch user:", error);
            toast.error("Failed to fetch user details.");
        } finally {
            setFetchingUser(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await axios.get("/api/users/logout");
            toast.success("Logged out successfully!");
            router.push("/login");
        } catch (error: unknown) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font-semibold text-gray-800">Profile Page</h1>
                <hr className="my-4" />
                
                <h2 className="text-lg text-gray-700">
                    {data ? (
                        <Link href={`/profile/${data}`} className="text-blue-600 hover:underline">
                            {data}
                        </Link>
                    ) : (
                        "No data available"
                    )}
                </h2>

                <div className="mt-6 space-y-4">
                    <button
                        onClick={getUserDetails}
                        disabled={fetchingUser}
                        className={`w-full px-4 py-2 font-semibold text-white rounded-lg transition ${
                            fetchingUser ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                        {fetchingUser ? "Fetching..." : "Get User Details"}
                    </button>

                    <button
                        onClick={logout}
                        disabled={loading}
                        className={`w-full px-4 py-2 font-semibold text-white rounded-lg transition ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                        }`}
                    >
                        {loading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            </div>
        </div>
    );
}