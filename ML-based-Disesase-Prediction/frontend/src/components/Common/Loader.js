const Loader = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-5">
      <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }} role="status"></div>
      <div style={{ fontWeight: "600", color: "#64748b", fontSize: "14px" }}>Analyzing Clinical Data...</div>
    </div>
  );
};

export default Loader;