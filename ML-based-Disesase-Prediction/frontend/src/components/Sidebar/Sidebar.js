import { useEffect, useState } from "react";

const Sidebar = ({ history, open, setOpen, setSelectedChat, dark, setDark }) => {

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") { setDark(true); document.body.style.background = "#0f172a"; }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.body.style.background = dark ? "#0f172a" : "#f8fafc";
  }, [dark]);

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} style={{ position: "fixed", top: "12px", left: "10px", zIndex: 2000, border: `1px solid ${dark ? '#475569' : '#e2e8f0'}`, background: "#fff", borderRadius: "10px", width: "40px", height: "40px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>☰</button>
      )}

      <div style={{ position: "fixed", top: 0, left: open ? 0 : "-260px", width: "260px", height: "100vh", background: dark ? "#1e293b" : "#ffffff", borderRight: `1px solid ${dark ? '#475569' : '#e2e8f0'}`, transition: "all 0.3s ease", zIndex: 1000, display: "flex", flexDirection: "column", padding: "20px" }}>
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#0d6efd", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", fontWeight: "bold" }}>M</div>
            <span style={{ marginLeft: "10px", fontWeight: "700", color: dark ? "#f8fafc" : "#0f172a", fontSize: "18px" }}>MediRx</span>
          </div>
          <button onClick={() => setOpen(false)} className="btn btn-sm" style={{ color: dark ? "#94a3b8" : "#64748b" }}>✕</button>
        </div>

        <button onClick={() => setSelectedChat(null)} style={{ border: `1px dashed ${dark ? '#475569' : '#cbd5e1'}`, background: dark ? "#334155" : "#f8fafc", color: dark ? "#f8fafc" : "#475569", borderRadius: "12px", padding: "12px", marginBottom: "24px", fontWeight: "600", fontSize: "14px", transition: "0.2s" }}>
          + Initiate New Consultation
        </button>

        <div className="mb-2 text-uppercase" style={{ fontSize: "11px", fontWeight: "800", color: "#94a3b8", letterSpacing: "0.5px" }}>Past Consultations</div>
        
        <div style={{ flex: 1, overflowY: "auto", margin: "0 -10px", padding: "0 10px" }}>
          {history?.length === 0 ? (
             <div className="text-center mt-4 px-3" style={{ fontSize: "13px", color: "#94a3b8" }}>No past consultations yet.</div>
          ) : history?.map((chat) => (
            <div key={chat.id} onClick={() => setSelectedChat(chat)} className="history-item" style={{ padding: "10px 12px", borderRadius: "10px", cursor: "pointer", color: dark ? "#cbd5e1" : "#475569", marginBottom: "4px", fontSize: "13px", transition: "all 0.2s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              onMouseEnter={(e) => e.currentTarget.style.background = dark ? "#334155" : "#f1f5f9"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span className="me-2">💬</span> {chat.title}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", marginTop: "10px" }}>
          <div className="d-flex align-items-center mb-3" style={{ cursor: "pointer", color: dark ? "#cbd5e1" : "#475569", fontSize: "14px" }} onClick={() => setDark(!dark)}>
            <span className="me-2">{dark ? "🌙" : "☀️"}</span> {dark ? "Dark Mode" : "Light Mode"}
          </div>
          <button className="btn w-100 d-flex align-items-center justify-content-center" onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }} 
            style={{ borderRadius: "10px", padding: "10px", background: "#fee2e2", color: "#ef4444", border: "none", fontWeight: "600", fontSize: "14px" }}>
            <span className="me-2">🚪</span> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;