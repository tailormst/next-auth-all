"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import axios from "axios";

interface Classroom {
    id: string
    name: string
}

interface Assignment {
    id: string
    title: string
    dueDate: string
}

export default function Dashboard() {
    const [classrooms, setClassrooms] = useState<Classroom[]>([])
    const [assignments, setAssignments] = useState<Assignment[]>([])
    const router = useRouter()

    useEffect(() => {
        setClassrooms([
            { id: "1", name: "Math 101" },
            { id: "2", name: "History 202" },
        ])
        setAssignments([
            { id: "1", title: "Algebra Homework", dueDate: "2023-06-01" },
            { id: "2", title: "History Essay", dueDate: "2023-06-05" },
        ])
    }, [])

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                toast.error(error.message)
            } else {
                toast.error("An unknown error occurred")
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-gray-100 flex-row gap-10">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                <button
                    onClick={logout}
                    className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >Logout</button>
            </div>
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
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                        <a href="https://classroom.google.com/u/0/">Join New Classroom</a>
                    </button>
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
            <div className="mt-8">
                <Link
                    href="/attendance"
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                >
                    View Attendance
                </Link>
            </div>
        </div>
    )
}
