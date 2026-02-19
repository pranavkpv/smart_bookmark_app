import { supabase } from "@/lib/supabaseClient";

export const signInWithGoogle = async () => {

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { 
      redirectTo: `${window.location.origin}/dashboard`
    },
  });

  if (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};