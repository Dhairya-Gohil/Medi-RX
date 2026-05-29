const ResultCard = ({ item }) => {
  return (
    <div className="mb-4" style={{ background: "#fff", borderRadius: "20px", padding: "24px", border: "1px solid #e2e8f0" }}>
      <div className="d-flex align-items-center mb-4">
        <div style={{ fontSize: "24px", marginRight: "12px" }}>🦠</div>
        <h4 className="fw-bold mb-0" style={{ color: "#0f172a" }}>{item.disease}</h4>
      </div>

      <div className="row g-3">
        {item.medicines.map((med, i) => (
          <div key={i} className="col-md-6">
            <div className="p-3 h-100 d-flex flex-column" style={{ border: "1px solid #f1f5f9", borderRadius: "16px", background: "#f8fafc", transition: "0.2s" }}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <span style={{ fontWeight: "700", color: "#1e293b", fontSize: "15px" }}>{med.name}</span>
                <span className="badge" style={{ background: "#dcfce7", color: "#15803d", borderRadius: "6px", fontSize: "10px" }}>
                  {med.group}
                </span>
              </div>

              <div className="mb-2" style={{ fontSize: "14px" }}>
                Price: <span style={{ fontWeight: "700", color: "#0f172a" }}>₹{med.price}</span>
              </div>

              <div className="text-muted" style={{ fontSize: "12px", lineHeight: "1.5", whiteSpace: "pre-line" }}>
                {med.details?.replace(/\*\*/g, "")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultCard;