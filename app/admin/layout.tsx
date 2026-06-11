"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "@/styles/globals.css";
import { AuthContext } from "./auth-context";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("adminToken");
    setToken(t);
    setLoading(false);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const { token: t } = await res.json();
      localStorage.setItem("adminToken", t);
      setToken(t);
    } else {
      setError("パスワードが正しくありません");
    }
  }

  function logout() {
    localStorage.removeItem("adminToken");
    fetch("/api/admin/login", { method: "DELETE" });
    setToken(null);
  }

  if (loading) return null;

  if (!token) {
    return (
      <div className="admin-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ width: 340, border: "1px solid #333", padding: 40 }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 32, textAlign: "center" }}>Admin Login</p>
          <form onSubmit={handleLogin}>
            <div className="admin-form-group">
              <label>Password</label>
              <input
                type="password"
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="管理者パスワード"
                autoFocus
              />
            </div>
            {error && <p style={{ color: "var(--rose)", fontSize: 12, marginBottom: 16 }}>{error}</p>}
            <button type="submit" className="admin-btn admin-btn-gold" style={{ width: "100%", textAlign: "center" }}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ token, logout }}>
      <div className="admin-wrap">
        <header className="admin-header">
          <h1>梨花祭2026 管理画面</h1>
          <nav className="admin-nav">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/events">企画管理</Link>
            <Link href="/admin/notices">お知らせ管理</Link>
            <Link href="/" target="_blank">サイトを見る</Link>
          </nav>
          <button onClick={logout} className="admin-btn admin-btn-rose" style={{ marginLeft: 16 }}>Logout</button>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </AuthContext.Provider>
  );
}
