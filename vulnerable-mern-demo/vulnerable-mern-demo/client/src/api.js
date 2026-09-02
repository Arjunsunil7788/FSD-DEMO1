import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

export function authHeader() {
  // ⚠️ VULNERABLE: token read from localStorage — readable by any script on
  // the page, which is exactly what an XSS payload (see NoteView) can steal.
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = axios.create({ baseURL: API_BASE });
