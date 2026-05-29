const InputBox = ({ symptoms, setSymptoms, setData, setLoading, refreshHistory, sidebarOpen, setUserQuery, dark }) => {
  const handlePredict = async () => {
    if (!symptoms) return;
    setUserQuery(symptoms);
    setLoading(true);
    try {
      const res = await predictDisease({ symptoms });
      setData(res);
      refreshHistory();
    } catch (err) {
      alert("Error processing diagnosis");
    }
    setSymptoms("");
    setLoading(false);
  };

  return (
    <footer style={{ position: "fixed", bottom: 0, left: sidebarOpen ? "260px" : "0px", width: sidebarOpen ? "calc(100% - 260px)" : "100%", background: "transparent", padding: "20px", transition: "all 0.3s ease", zIndex: 100 }}>
      <div className="d-flex align-items-center shadow-lg" style={{ width: "90%", maxWidth: "800px", margin: "0 auto", border: `1px solid ${dark ? '#475569' : '#e2e8f0'}`, borderRadius: "18px", padding: "8px 12px", background: dark ? "#1e293b" : "#fff" }}>
        <input className="form-control border-0 px-3" style={{ boxShadow: "none", background: "transparent", height: "45px" }} value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Describe what you're feeling..." onKeyDown={(e) => e.key === "Enter" && handlePredict()} />
        <button className="btn" style={{ background: "#0d6efd", color: "#fff", borderRadius: "12px", width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handlePredict}>
          ➤
        </button>
      </div>
    </footer>
  );
};

export default InputBox;