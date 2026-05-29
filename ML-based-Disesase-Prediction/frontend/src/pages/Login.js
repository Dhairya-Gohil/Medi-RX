import { useState } from "react";
import { loginUser } from "../api/auth.api";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      /* REDIRECT */
      if (res.data.role === "doctor") {
        window.location.href = "/doctor";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }

    setLoading(false);
  };

  // Inline styling constants for cleaner JSX
  const inputContainerStyle = { position: "relative" };
  const iconStyle = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
  };
  const inputStyle = {
    height: "48px",
    borderRadius: "8px",
    paddingLeft: "42px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #e2e8f0",
  };

  return (
    <div className="container-fluid vh-100 p-0 overflow-hidden" style={{ background: "#fff" }}>
      <div className="row g-0 h-100">
        
        {/* LEFT SIDE: Info & Brand */}
        <div
          className="col-md-6 d-flex flex-column justify-content-between p-5"
          style={{
            background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",
            borderRight: "1px solid #f1f5f9",
          }}
        >
          <div>
            <div className="d-flex align-items-center mb-5" style={{ marginTop: "100px" }}>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#0d6efd",
                  borderRadius: "10px",
                  marginRight: "12px",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              </div>
              <h5 className="mb-0" style={{ fontWeight: "700", color: "#0f172a" }}>MediRx</h5>
            </div>

            <div style={{ maxWidth: "480px", marginTop: "15vh" }}>
              <h1 className="mb-4" style={{ fontWeight: "800", fontSize: "48px", color: "#0f172a", lineHeight: "1.1" }}>
                A calmer way to understand your symptoms.
              </h1>
              <p className="mb-5" style={{ fontSize: "18px", color: "#475569", lineHeight: "1.6" }}>
                Chat through what's bothering you and get a preliminary, doctor-reviewed prediction in minutes.
              </p>

              {/* <div
                className="d-inline-flex align-items-center p-3"
                style={{
                  background: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d6efd" strokeWidth="2" style={{ marginRight: "12px" }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                <span style={{ fontSize: "14px", color: "#64748b" }}>
                  HIPAA-aligned data handling. End-to-end encrypted.
                </span>
              </div> */}
            </div>
          </div>

          <div style={{ fontSize: "13px", color: "#94a3b8" }}>
            © 2026 MediRx Health Systems
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center p-5">
          <div style={{ width: "100%", maxWidth: "420px" }}>
            <h2 className="mb-2" style={{ fontWeight: "700", fontSize: "32px", color: "#0f172a" }}>
              Sign in to your account
            </h2>
            <p className="mb-4" style={{ color: "#64748b" }}>Choose your role to continue.</p>

            {/* ROLE TOGGLE */}
            <div
              className="d-flex p-1 mb-4"
              style={{ background: "#f1f5f9", borderRadius: "12px" }}
            >
              <button
                type="button"
                className="btn flex-grow-1 border-0"
                onClick={() => setForm({ ...form, role: "patient" })}
                style={{
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  padding: "10px",
                  backgroundColor: form.role === "patient" ? "#fff" : "transparent",
                  boxShadow: form.role === "patient" ? "0 4px 6px -1px rgb(0 0 0 / 0.1)" : "none",
                  color: form.role === "patient" ? "#0f172a" : "#64748b",
                }}
              >
                <span className="me-2">👤</span> I am a Patient
              </button>
              <button
                type="button"
                className="btn flex-grow-1 border-0"
                onClick={() => setForm({ ...form, role: "doctor" })}
                style={{
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  padding: "10px",
                  backgroundColor: form.role === "doctor" ? "#fff" : "transparent",
                  boxShadow: form.role === "doctor" ? "0 4px 6px -1px rgb(0 0 0 / 0.1)" : "none",
                  color: form.role === "doctor" ? "#0f172a" : "#64748b",
                }}
              >
                <span className="me-2">🩺</span> I am a Doctor
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px", display: "block" }}>Email</label>
                <div style={inputContainerStyle}>
                  <div style={iconStyle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <input
                    type="email"
                    placeholder="you@clinic.com"
                    className="form-control"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px", display: "block" }}>Password</label>
                <div style={inputContainerStyle}>
                  <div style={iconStyle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="form-control"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn w-100 mb-4"
                style={{
                  height: "48px",
                  background: "#0d6efd",
                  color: "#fff",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "16px",
                  border: "none",
                }}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="text-center" style={{ fontSize: "14px" }}>
                <span style={{ color: "#64748b" }}>New to MediTriage? </span>
                <a href="/register" style={{ color: "#0d6efd", textDecoration: "none", fontWeight: "600" }}>Create an account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;