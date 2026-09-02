import React, { useState } from "react";
import { api, authHeader } from "../api";

export default function NewNote({ onCreated }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post("/notes", { title, body }, { headers: authHeader() });
    setTitle("");
    setBody("");
    onCreated();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New note</h2>
      <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="body (try some HTML...)" value={body} onChange={(e) => setBody(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}
