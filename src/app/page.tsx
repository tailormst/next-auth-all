import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to Modern Classroom</h1>
      <div className="space-x-4">
        <Link
          href="/login"
          className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-600 transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}

