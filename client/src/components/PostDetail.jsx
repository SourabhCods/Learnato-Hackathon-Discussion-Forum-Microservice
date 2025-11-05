import React from "react";

import { useEffect, useState } from "react";
import { api } from "../api";
import ReplyBox from "./ReplyBox.jsx";

export default function PostDetail({ id, onBack }) {
  const [post, setPost] = useState(null);

  async function load() {
    const { data } = await api.get(`/posts/${id}`);
    setPost(data);
  }

  useEffect(() => {
    load();
  }, [id]);

  if (!post) return <div className="text-muted">Loading…</div>;

  return (
    <div className="space-y-4">
      <button className="btn" onClick={onBack}>
        ← Back
      </button>
      <div className="card">
        <div className="flex items-center gap-2">
          <span className="badge">▲ {post.votes}</span>
          {post.isAnswered && <span className="badge">Answered</span>}
        </div>
        <h2 className="text-2xl font-bold mt-2">{post.title}</h2>
        <p className="text-muted">
          by {post.author || "Anonymous"} •{" "}
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <p className="mt-4 whitespace-pre-wrap">{post.content}</p>
      </div>

      <section className="space-y-2">
        <h3 className="font-semibold">Replies ({post.replies?.length || 0})</h3>
        {post.replies?.length ? (
          <ul className="space-y-2">
            {post.replies.map((r) => (
              <li key={r._id} className="card">
                <p>{r.content}</p>
                <p className="text-muted mt-1">
                  by {r.author || "Anonymous"} •{" "}
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-muted">No replies yet.</div>
        )}
      </section>

      <ReplyBox postId={post._id} />
    </div>
  );
}
