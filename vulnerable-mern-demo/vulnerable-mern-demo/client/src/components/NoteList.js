import React, { useEffect, useState } from "react";
import { api, authHeader } from "../api";
import NoteView from "./NoteView";

export default function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    api.get("/notes", { headers: authHeader() }).then((res) => setNotes(res.data));
  }, []);

  return (
    <div>
      <h2>Notes</h2>
      {notes.map((n) => (
        <NoteView key={n._id} note={n} />
      ))}
    </div>
  );
}
