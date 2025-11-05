import React from "react";
import { useState } from "react";

import Header from "./components/Header.jsx";
import PostList from "./components/PostList.jsx";
import PostDetail from "./components/PostDetail.jsx";
import NewPostModal from "./components/NewPostModal.jsx";

export default function App() {
  const [open, setOpen] = useState(false);
  const [activePostId, setActivePostId] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Discussions</h2>
          <button className="btn-primary" onClick={() => setOpen(true)}>
            + New Post
          </button>
        </div>

        {!activePostId ? (
          <PostList onOpenPost={setActivePostId} />
        ) : (
          <PostDetail id={activePostId} onBack={() => setActivePostId(null)} />
        )}
      </main>

      <NewPostModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
