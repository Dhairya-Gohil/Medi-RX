const WelcomeScreen = ({ dark }) => {
  const suggestions = [
    "Severe migraine since 24 hours, sensitivity to light",
    "Acute lower back stiffness after lifting",
    "Persistent dry cough and mild fever for 3 days",
    "Itchy rash on forearm after switching detergent"
  ];

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="text-center" style={{ maxWidth: "800px", padding: "20px" }}>
        {/* LOGO ICON */}
        <div className="mb-4 d-inline-flex align-items-center justify-content-center" 
             style={{ width: "64px", height: "64px", background: "#0d6efd", borderRadius: "16px", boxShadow: "0 8px 16px rgba(13, 110, 253, 0.2)" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
        </div>

        <h1 style={{ fontWeight: "800", color: dark ? "#f8fafc" : "#0f172a", fontSize: "2.5rem", marginBottom: "16px" }}>
          Hello. I'm <span style={{ color: "#0d6efd" }}>MediRx.</span>
        </h1>
        
        <p style={{ color: dark ? "#94a3b8" : "#64748b", fontSize: "1.1rem", marginBottom: "40px", lineHeight: "1.6" }}>
          Share your symptoms below — I'll analyze them with our <br/>
          clinical model and walk you through what they likely mean.
        </p>

        {/* FEATURE TAGS */}
        {/* <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
          {['ML CLASSIFIER', 'GEMINI REASONING', 'DRUG DICTIONARY'].map((text) => (
            <div key={text} style={{ 
              padding: "10px 20px", border: "1px solid #e2e8f0", borderRadius: "12px", 
              fontSize: "12px", fontWeight: "700", color: "#64748b", background: "#fff" 
            }}>
              {text}
            </div>
          ))}
        </div> */}

        {/* <div className="mb-3 text-uppercase" style={{ fontSize: "12px", fontWeight: "800", color: "#94a3b8", letterSpacing: "1px" }}>
          Try one of these
        </div> */}

        {/* SUGGESTION GRID */}
        {/* <div className="row g-3 justify-content-center">
          {suggestions.map((item, index) => (
            <div key={index} className="col-md-6">
              <div style={{ 
                padding: "20px", border: "1px solid #e2e8f0", borderRadius: "16px", 
                background: "#fff", cursor: "pointer", fontSize: "14px", color: "#475569",
                textAlign: "left", transition: "all 0.2s ease", height: "100%",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0d6efd"; e.currentTarget.style.background = "#f8faff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff"; }}
              >
                {item}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default WelcomeScreen;