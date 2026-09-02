import React, { useState } from "react";
import { api } from "../api";

export default function Login({ onLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      // ⚠️ VULNERABLE: JWT stored in localStorage, not an HttpOnly cookie —
      // this is the Day 2 "where do you keep the token" trade-off.
      localStorage.setItem("token", res.data.token);
      onLoggedIn();
    } catch (err) {
      setError("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
      {error && <p>{error}</p>}
    </form>
  );
}
