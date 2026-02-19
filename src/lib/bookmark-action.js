import { supabase } from "./supabaseClient";

export const bookmarkService = {
   // Fetch all bookmarks for a specific user
   async fetchAll(userId) {
      const { data, error } = await supabase
         .from("bookmarks")
         .select("*")
         .eq("user_id", userId)
         .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
   },

   // Add a new bookmark
   async add(title, url, userId) {
      // 1. Check if the URL already exists for this user
      const { data: existing, error: fetchError } = await supabase
         .from("bookmarks")
         .select("id")
         .eq("user_id", userId)
         .eq("url", url)
         .maybeSingle(); // Returns null if nothing found instead of an error

      if (fetchError) throw fetchError;

      // 2. If it exists, throw a custom error message
      if (existing) {
         throw new Error("You have already bookmarked this URL.");
      }

      // 3. If not, proceed with insert
      const { error } = await supabase
         .from("bookmarks")
         .insert([{ title, url, user_id: userId }]);

      if (error) throw error;
   },

   // Update an existing bookmark
   async update(id, title, url, userId) {
      // 1. Check if ANY OTHER bookmark has this URL for this user
      const { data: existing, error: fetchError } = await supabase
         .from("bookmarks")
         .select("id")
         .eq("user_id", userId)
         .eq("url", url)
         .neq("id", id) // "Not Equal" to current ID: ignores the record we are editing
         .maybeSingle();

      if (fetchError) throw fetchError;

      if (existing) {
         throw new Error("Another bookmark already exists with this URL.");
      }

      // 2. Proceed with the update
      const { error } = await supabase
         .from("bookmarks")
         .update({ title, url })
         .eq("id", id);

      if (error) throw error;
   },

   // Delete a bookmark
   async delete(id) {
      const { error } = await supabase.from("bookmarks").delete().eq("id", id);
      if (error) throw error;
   },

   // Logout
   async logout() {
      await supabase.auth.signOut();
   }
};