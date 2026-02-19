"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/auth-actions";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setIsLoading(false);
      alert("Failed to sign in");
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_IN") router.push("/dashboard");
      }
    );
    return () => authListener.subscription.unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Smart Bookmark
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Save your web, stay organized.
          </p>
        </div>
        
        <div className="mt-8">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 
                       text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                       transition-all duration-200 shadow-sm"
          >
            <span className="flex items-center">
              {isLoading ? (
                "Connecting..."
              ) : (
                <>
                  <img 
                    src="https://www.svgrepo.com/show/355037/google.svg" 
                    className="w-5 h-5 mr-3" 
                    alt="Google" 
                  />
                  Continue with Google
                </>
              )}
            </span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-400">
          By continuing, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}