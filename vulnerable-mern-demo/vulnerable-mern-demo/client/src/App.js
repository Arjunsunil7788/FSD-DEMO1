import React, { useState } from "react";
import Login from "./components/Login";
import NoteList from "./components/NoteList";
import NewNote from "./components/NewNote";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [refreshKey, setRefreshKey] = useState(0);

  if (!loggedIn) {
    return <Login onLoggedIn={() => setLoggedIn(true)} />;
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Vulnerable MERN Demo</h1>
      <NewNote onCreated={() => setRefreshKey((k) => k + 1)} />
      <NoteList key={refreshKey} />
    </div>
  );
}
