import React from "react";

import { useState } from "react";
import { api } from "../api";

export default function NewPostModal({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  if (!open) return null;

  async function submit(e) {
    e.preventDefault();
    await api.post("/posts", { title, content, author: author || "Anonymous" });
    setTitle("");
    setContent("");
    setAuthor("");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
      <form onSubmit={submit} className="card w-full max-w-xl space-y-3">
        <div className="text-lg font-semibold">New Post</div>
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="input h-32"
          placeholder="Describe your question…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="Your name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
