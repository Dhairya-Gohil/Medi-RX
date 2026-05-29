import { useState } from "react";
import { registerUser } from "../api/auth.api";
import { verifyOTP } from "../api/auth.api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: ""
  });

  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] =useState(false);

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await registerUser(form);

        alert(
          "OTP sent to email"
        );

        setShowOTP(true);
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }

    setLoading(false);
  };

  const handleVerifyOTP =
  async () => {

    try {

      const res =
        await verifyOTP({

          email:
            form.email,

          otp
        });

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      window.location.href = "/login";

    } catch (err) {

      alert(
        err.response?.data?.msg ||
        "OTP verification failed"
      );
    }
  };

  // Inline styling constants
  const inputContainerStyle = { position: "relative" };
  const iconStyle = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    zIndex: 10
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
          className="col-md-6 d-none d-md-flex flex-column justify-content-between p-5"
          style={{
            background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",
            borderRight: "1px solid #f1f5f9",
          }}
        >
          <div>
            <div className="d-flex align-items-center mb-5 " style={{ marginTop: "100px" }}>
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

            <div style={{ maxWidth: "480px", marginTop: "10vh" }}>
              <h1 className="mb-4" style={{ fontWeight: "800", fontSize: "42px", color: "#0f172a", lineHeight: "1.1" }}>
                Start your journey to better health.
              </h1>
              <p className="mb-5" style={{ fontSize: "18px", color: "#475569", lineHeight: "1.6" }}>
                Create an account to access AI-powered symptom analysis and connect with clinical professionals.
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
                  Your medical data is encrypted and secure.
                </span>
              </div> */}
            </div>
          </div>

          <div style={{ fontSize: "13px", color: "#94a3b8" }}>
            © 2026 MediRx Health Systems
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4 p-md-5 overflow-auto">
          <div style={{ width: "100%", maxWidth: "440px" }}>
            <h2 className="mb-2" style={{ fontWeight: "700", fontSize: "32px", color: "#0f172a" }}>
              Create Account
            </h2>
            <p className="mb-4" style={{ color: "#64748b" }}>Please fill in your details to get started.</p>

            <form onSubmit={handleSubmit}>
              {/* FULL NAME */}
              <div className="mb-3">
                <label style={{ fontSize: "14px", fontWeight: "600", marginBottom: "6px", display: "block" }}>Full Name</label>
                <div style={inputContainerStyle}>
                  <div style={iconStyle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="form-control"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              {/* AGE & GENDER ROW */}
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label style={{ fontSize: "14px", fontWeight: "600", marginBottom: "6px", display: "block" }}>Age</label>
                  <div style={inputContainerStyle}>
                    <div style={iconStyle}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <input
                      type="number"
                      placeholder="Age"
                      className="form-control"
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      style={inputStyle}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label style={{ fontSize: "14px", fontWeight: "600", marginBottom: "6px", display: "block" }}>Gender</label>
                  <div style={inputContainerStyle}>
                    <div style={iconStyle}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/></svg>
                    </div>
                    <select
                      className="form-select"
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value.toLowerCase() })}
                      style={inputStyle}
                      required
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label style={{ fontSize: "14px", fontWeight: "600", marginBottom: "6px", display: "block" }}>Email Address</label>
                <div style={inputContainerStyle}>
                  <div style={iconStyle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="form-control"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mb-4">
                <label style={{ fontSize: "14px", fontWeight: "600", marginBottom: "6px", display: "block" }}>Password</label>
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

              {
  showOTP && (

    <input
      type="text"

      placeholder="Enter OTP"

      className="form-control mb-3"

      value={otp}

      onChange={(e) =>
        setOtp(
          e.target.value
        )
      }

      style={{
        height: "50px",
        borderRadius: "12px"
      }}
    />
  )
}

              {
  !showOTP ? (

    <button
      type="submit"

      disabled={loading}

      className="btn w-100"

      style={{
        height: "50px",
        background: "#2a9d8f",
        color: "#fff",
        borderRadius: "12px",
        fontWeight: "600"
      }}
    >
      {
        loading
          ? "Please wait..."
          : "Register"
      }
    </button>

  ) : (

    <button
      type="button"

      onClick={
        handleVerifyOTP
      }

      className="btn w-100"

      style={{
        height: "50px",
        background: "#2a9d8f",
        color: "#fff",
        borderRadius: "12px",
        fontWeight: "600"
      }}
    >
      Verify OTP
    </button>
  )
}

              <div className="text-center" style={{ fontSize: "14px" }}>
                <span style={{ color: "#64748b" }}>Already have an account? </span>
                <a href="/login" style={{ color: "#0d6efd", textDecoration: "none", fontWeight: "600" }}>Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;