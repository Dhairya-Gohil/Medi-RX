import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/auth.api";

const Navbar = ({ sidebarOpen, dark }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try { const res = await getUserProfile(); setUser(res); } catch (err) { console.log(err); }
    };
    fetchUser();
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: sidebarOpen ? "260px" : "0px", width: sidebarOpen ? "calc(100% - 260px)" : "100%", height: "64px", background: dark ? "#1e293b" : "#ffffff", borderBottom: `1px solid ${dark ? '#475569' : '#e2e8f0'}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", zIndex: 999, transition: "all 0.3s ease" }}>
      
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ fontSize: "18px", fontWeight: "700", color: dark ? "#f8fafc" : "#0f172a", marginLeft: sidebarOpen ? "0px" : "45px" }}>
          Consultation
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* <div className="d-none d-md-flex align-items-center" style={{ fontSize: "12px", fontWeight: "700", color: "#10b981" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", marginRight: "8px", display: "inline-block" }}></span>
          ML + GEMINI ONLINE
        </div> */}

        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", background: dark ? "#1e293b" : "#f8fafc", padding: "6px 14px", borderRadius: "12px", border: `1px solid ${dark ? '#475569' : '#e2e8f0'}` }}>
            <div style={{ textAlign: "right", lineHeight: "1.2" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: dark ? "#f8fafc" : "#0f172a" }}>{user.name}</div>
              <div style={{ fontSize: "11px", color: dark ? "#94a3b8" : "#64748b" }}>Patient</div>
            </div>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#0d6efd", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "14px" }}>
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;