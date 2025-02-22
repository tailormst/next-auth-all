"use client";
import axios from "axios";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const contactRef = useRef<HTMLDivElement>(null);

  // Smooth Scroll to Contact Section
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget; // Store form reference before async call

    try {
      const formData = new FormData(form);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      };

      const response = await axios.post("/api/users/contact", data);
      if (response.status === 201) {
        alert("Form submitted successfully!");
        form.reset(); // Reset using the stored reference
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white bg-opacity-10 shadow-md py-4 px-6 flex justify-between items-center z-50">
        <h2 className="text-2xl font-bold tracking-wide">
          <span className="text-yellow-300">Modern</span> Classroom
        </h2>
        <div className="space-x-6">
          <Link href="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <button onClick={scrollToContact} className="hover:text-yellow-300 transition">
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4 mt-16">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-yellow-300">Modern Classroom</span>
        </h1>
        <p className="text-lg mb-8 opacity-90 max-w-md">
          A smart, AI-powered classroom management system designed for the future of education.
        </p>
        <div className="flex space-x-6">
          <Link href="/login">
            <div className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg backdrop-blur-md bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 transform hover:scale-105">
              Login
            </div>
          </Link>
          <Link href="/signup">
            <div className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg backdrop-blur-md bg-opacity-90 hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105">
              Sign Up
            </div>
          </Link>
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Get in <span className="text-yellow-300">Touch</span>
        </h1>
        <p className="text-lg mb-8 opacity-90 max-w-md">
          Have questions or need support? Fill out the form below, and we&#39;ll get back to you soon.
        </p>

        {/* Contact Form */}
        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              required
              className="p-3 bg-white bg-opacity-30 text-black placeholder-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="p-3 bg-white bg-opacity-30 text-black placeholder-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <textarea
              name="message"
              placeholder="How can we help you?"
              rows={4}
              required
              className="p-3 bg-white bg-opacity-30 text-black placeholder-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-black bg-opacity-30 backdrop-blur-lg text-center py-4 mt-10">
        <p className="text-sm opacity-80">© 2025 Modern Classroom. Built with 💙 for the future of learning.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://duhacks.tech/" className="hover:text-yellow-300 transition">
            DuHacks
          </a>
          <a href="https://www.linkedin.com/in/mohammed-tailor-002968288/" className="hover:text-yellow-300 transition">
            LinkedIn
          </a>
          <a href="https://github.com/tailormst/next-auth-all" className="hover:text-yellow-300 transition">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
