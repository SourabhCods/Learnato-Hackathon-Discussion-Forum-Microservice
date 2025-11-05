import React from "react";

import { useState } from "react";
import { api } from "../api";

export default function ReplyBox({ postId }) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  async function submit(e) {
    e.preventDefault();
    await api.post(`/posts/${postId}/reply`, {
      content,
      author: author || "Anonymous",
    });
    setContent("");
    setAuthor("");
  }

  return (
    <form onSubmit={submit} className="card space-y-2">
      <div className="text-sm font-medium">Add Reply</div>
      <textarea
        className="input h-24"
        placeholder="Share your insight…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <input
          className="input"
          placeholder="Your name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button className="btn-primary" type="submit">
          Reply
        </button>
      </div>
    </form>
  );
}
