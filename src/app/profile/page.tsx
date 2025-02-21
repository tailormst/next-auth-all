"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast"

export default function ProfilePage() {

    const router = useRouter();
    const [data, setData] = useState("nothing")


    const getUserDetails = async () => {
        const response = await axios.get('/api/users/me');
        console.log(response.data);
        setData(response.data.data._id)
    }

    const logout = async () => {
        try {
            await axios.get("api/users/logout")
            router.push("/login")
        } catch (error: any) {
            console.log("Logout Failed");
            toast.error(error.message);
        }
    }

    return (
        <>
            <h1>Hello Profile Page</h1>
            <hr />
            <h1>Profile Page</h1>
            <h2>{data === "nothing" ? "Nothing" : 
                <Link href={`/profile/${data}`}>{data}</Link>
                }</h2>
            <button onClick={logout}>
                Logout
            </button>
                <br /><br />
            <button onClick={getUserDetails}>
                Get Started
            </button>
        </>
    );
}