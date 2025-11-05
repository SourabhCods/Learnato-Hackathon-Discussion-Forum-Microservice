import React, { useEffect, useState } from "react";
import { api } from "../api";
import { socket } from "../sockets";
import SearchBar from "./SearchBar";

export default function PostList({ onOpenPost }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("date");

  async function load() {
    setLoading(true);
    const { data } = await api.get("/posts", { params: { q, sort } });
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [q, sort]);

  useEffect(() => {
    const refresh = () => load();
    socket.on("post:created", refresh);
    socket.on("post:updated", refresh);
    socket.on("reply:created", refresh);

    return () => {
      socket.off("post:created", refresh);
      socket.off("post:updated", refresh);
      socket.off("reply:created", refresh);
    };
  }, [q, sort]);

  async function upvote(id) {
    await api.post(`/posts/${id}/upvote`);
  }

  async function markAnswered(id) {
    await api.post(`/posts/${id}/mark-answered`);
  }

  return (
    <div className="space-y-4">
      <SearchBar value={q} onChange={setQ} sort={sort} setSort={setSort} />

      {loading && <div>Loading...</div>}

      <ul className="grid gap-3">
        {posts.map((p) => (
          <li key={p._id} className="card">
            <div className="flex justify-between">
              <div>
                <h3
                  className="font-semibold cursor-pointer hover:underline"
                  onClick={() => onOpenPost(p._id)}
                >
                  {p.title}
                </h3>
                <p className="text-sm text-gray-500">
                  by {p.author} • {new Date(p.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="btn" onClick={() => upvote(p._id)}>
                  ▲ {p.votes}
                </button>
                {!p.isAnswered && (
                  <button className="btn" onClick={() => markAnswered(p._id)}>
                    Mark Answered
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
