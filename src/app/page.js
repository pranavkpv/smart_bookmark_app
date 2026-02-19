"use client";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Simple Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">SmartBookmark</span>
        </div>
        <button
          onClick={() => router.push("/login")}
          className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Manage your links <br />
            <span className="text-blue-600">smarter, not harder.</span>
          </h1>

          <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed">
            The all-in-one bookmarking tool designed for developers and researchers.
            Organize, search, and access your favorite resources in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Get Started for Free
            </button>

            <button
              className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
            >
              View Demo
            </button>
          </div>

          {/* Feature Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">Fast Search</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">Cloud Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">Google Auth</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Area */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        © 2026 Smart Bookmark App. Built with Next.js & Supabase.
      </footer>
    </div>
  );
}