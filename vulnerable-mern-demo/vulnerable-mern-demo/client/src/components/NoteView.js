import React from "react";

export default function NoteView({ note }) {
  return (
    <div className="note">
      <h3>{note.title}</h3>
      {/* ⚠️ VULNERABLE: raw HTML from the database rendered unsanitized —
          React's normal auto-escaping is bypassed here on purpose
          (XSS, grouped under A05 Injection in the 2025 list). */}
      <div dangerouslySetInnerHTML={{ __html: note.body }} />
    </div>
  );
}
