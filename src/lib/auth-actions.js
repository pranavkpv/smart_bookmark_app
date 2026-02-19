import { supabase } from "@/lib/supabaseClient";

export const signInWithGoogle = async () => {
  const redirectUrl = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { 
      redirectTo: redirectUrl 
    },
  });

  if (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};