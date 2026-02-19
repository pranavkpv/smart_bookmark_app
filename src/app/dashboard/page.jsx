"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { bookmarkService } from "@/lib/bookmark-action";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const router = useRouter();

  // Initial Auth Check
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        loadBookmarks(user.id);
      }
    };
    getUser();
  }, [router]);

  const loadBookmarks = async (userId) => {
    try {
      const data = await bookmarkService.fetchAll(userId);
      setBookmarks(data);
    } catch (err) { console.error(err); }
  };

  // Realtime Subscription
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("realtime-bookmarks")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookmarks" }, 
      () => loadBookmarks(user.id))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !url) return;
    try {
      if (editingId) {
        await bookmarkService.update(editingId, title, url,user.id);
        setEditingId(null);
      } else {
        await bookmarkService.add(title, url, user.id);
      }
      setTitle(""); setUrl("");
    } catch (err) { alert("Error saving bookmark"); }
  };

  const handleLogout = async () => {
    await bookmarkService.logout();
    router.push("/login");
  };

  if (!user) return <div className="flex justify-center items-center h-screen font-medium text-gray-500">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Bookmarks</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <button onClick={handleLogout} className="text-sm font-semibold text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
            Logout
          </button>
        </header>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Website Name (e.g. GitHub)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className={`font-bold py-3 px-6 rounded-xl text-white shadow-md transition-all active:scale-95 ${editingId ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"}`}>
              {editingId ? "Update Bookmark" : "Add Bookmark"}
            </button>
          </div>
        </form>

        {/* Bookmark List */}
        <div className="grid gap-4">
          {bookmarks.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
              No bookmarks yet. Start by adding one above!
            </div>
          )}
          {bookmarks.map((b) => (
            <div key={b.id} className="bg-white p-5 flex items-center justify-between rounded-2xl shadow-sm border border-gray-100 group hover:border-blue-200 transition-all">
              <div className="flex-1 min-w-0 mr-4">
                <h3 className="font-bold text-gray-900 truncate">{b.title}</h3>
                <a href={b.url} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline truncate block">
                  {b.url}
                </a>
              </div>
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditingId(b.id); setTitle(b.title); setUrl(b.url); }} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                  Edit
                </button>
                <button onClick={() => bookmarkService.delete(b.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}