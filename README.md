# Smart Bookmark App

A simple real-time bookmark manager built using **Next.js App Router**, **Supabase**, and **Tailwind CSS**.  
Users can sign in with Google, add private bookmarks, and see updates in real time.

---

## 🚀 Live Demo  
👉 Live URL: https://your-vercel-link.vercel.app  

---

## 📦 Tech Stack

- **Frontend:** Next.js (App Router)
- **Auth & Database:** Supabase (PostgreSQL)
- **Realtime:** Supabase Realtime
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

---

## ✅ Features Implemented

1. **Google Authentication**
   - Users can sign up and log in using Google OAuth only.
   - No email/password authentication is used.

2. **Add Bookmarks**
   - Logged-in users can add bookmarks with:
     - Title  
     - URL  

3. **Private Bookmarks**
   - Each user can only see their own bookmarks.
   - Supabase Row Level Security (RLS) ensures privacy.

4. **Real-Time Updates**
   - Bookmark list updates instantly across multiple tabs using Supabase Realtime.

5. **Delete Bookmarks**
   - Users can delete their own bookmarks.

6. **Deployed on Vercel**
   - App is live and publicly accessible.

---

## 🗂️ Database Schema (Supabase)
sql
create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text,
  url text,
  created_at timestamptz default now()
);

Row Level Security Policy
alter table bookmarks enable row level security;

create policy "Users can manage their own bookmarks"
on bookmarks
for all
using (auth.uid() = user_id);

⚙️ Setup Instructions

1. Clone Repository
   git clone [https://github.com/your-username/smart-bookmark-app.git](https://github.com/pranavkpv/smart_bookmark_app.git)
   cd smart-bookmark

2. Install Dependencies
   npm install

3. Create .env.local
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Run Project
    npm run dev
   
🧠 Problems Faced & Solutions

1️⃣ Google OAuth Redirect Issue

Problem: Google login was not redirecting correctly in Next.js App Router.
Solution:
Configured correct redirect URL in Supabase Auth settings and used signInWithOAuth() from Supabase client.

2️⃣ UUID Error in Database

Problem: Error invalid input syntax for type uuid: "1" occurred when inserting user_id.
Solution:
Used auth.uid() from Supabase session instead of manually inserting numeric values.

3️⃣ Real-Time Not Updating

Problem: Bookmark list did not update automatically in another tab.
Solution:
Subscribed to Supabase Realtime channels and refetched data on insert/delete events.

4️⃣ Row Level Security Blocking Inserts

Problem: Insert queries failed because RLS blocked access.
Solution:
Created proper RLS policies using auth.uid() = user_id.

📌 Future Improvements

Bookmark editing feature

Search and filter bookmarks

Tagging system

Folder organization

Dark mode UI

👤 Author

Pranav Raj KPV
MERN Stack Developer
📧 Email: your-email@gmail.com

📍 Kerala, India
