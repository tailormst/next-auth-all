"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Classroom {
    id: string;
    name: string;
}

interface Assignment {
    id: string;
    title: string;
    dueDate: string;
}

interface User {
    name: string;
    role: "student" | "teacher";
    institution: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const router = useRouter();

    // ✅ Helper function to get auth token
    const getAuthHeaders = () => {
        const token = localStorage.getItem("token"); // Ensure token exists
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get("/api/users/me", { headers: getAuthHeaders() });
                setUser(res.data.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.push("/login");
            }
        };

        const fetchClassrooms = async () => {
            try {
                const res = await axios.get("/api/users/classrooms", { headers: getAuthHeaders() });
                setClassrooms(res.data);
            } catch (err) {
                console.error("Error fetching classrooms:", err);
            }
        };

        const fetchAssignments = async () => {
            try {
                const res = await axios.get("/api/users/assignments", { headers: getAuthHeaders() });
                setAssignments(res.data);
            } catch (err) {
                console.error("Error fetching assignments:", err);
            }
        };

        fetchUserData();
        fetchClassrooms();
        fetchAssignments();
    }, [router]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}</h1>
            <p className="mb-4">Role: {user.role} | Institution: {user.institution}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">My Classrooms</h2>
                    <ul className="space-y-2">
                        {classrooms.map((classroom) => (
                            <li key={classroom.id}>
                                <Link href={`/classroom/${classroom.id}`} className="text-blue-500 hover:underline">
                                    {classroom.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {user.role === "student" && (
                        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                            Join New Classroom
                        </button>
                    )}
                    {user.role === "teacher" && (
                        <Link
                            href="/create-classroom"
                            className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                        >
                            Create New Classroom
                        </Link>
                    )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Upcoming Assignments</h2>
                    <ul className="space-y-2">
                        {assignments.map((assignment) => (
                            <li key={assignment.id} className="flex justify-between items-center">
                                <span>{assignment.title}</span>
                                <span className="text-sm text-gray-500">Due: {assignment.dueDate}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
