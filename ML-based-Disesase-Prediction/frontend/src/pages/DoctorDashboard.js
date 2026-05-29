import { useEffect, useState } from "react";
import {
  getPendingReviewsAPI,
  approveReviewAPI,
  rejectReviewAPI,
  editReviewAPI
} from "../api/doctor.api";

const DoctorDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [doctorResponse, setDoctorResponse] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");

  const fetchReviews = async () => {
    try {
      const data = await getPendingReviewsAPI();
      setReviews(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (reviewId) => {
    try {
      await approveReviewAPI(reviewId, {
        approvedDisease: selectedDisease,
        doctorNotes
      });
      alert("Disease Approved");
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectReviewAPI(id);
      alert("Rejected");
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (reviewId) => {
    try {
      await editReviewAPI(reviewId, {
        approvedDisease: selectedDisease,
        doctorResponse,
        doctorNotes
      });
      alert("Updated");
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center" style={{ background: "#f8fafc" }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", background: "#f8fafc", padding: "0" }}>
      {/* TOP HEADER */}
      <div style={{ 
        height: "70px", background: "#fff", borderBottom: "1px solid #e2e8f0", 
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px" 
      }}>
        <div className="d-flex align-items-center">
          <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#0d6efd", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", fontWeight: "bold", marginRight: "12px" }}>M</div>
          <h5 className="mb-0" style={{ fontWeight: "800", color: "#0f172a" }}>Clinician Dashboard</h5>
        </div>
        <button 
          onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
          className="btn" style={{ borderRadius: "8px", background: "#fee2e2", color: "#ef4444", fontWeight: "600", fontSize: "14px", border: "none", padding: "8px 20px" }}
        >
          Logout
        </button>
      </div>

      <div className="container-fluid" style={{ height: "calc(100vh - 70px)", padding: "24px" }}>
        <div className="row h-100 g-4">
          
          {/* SIDEBAR: PATIENT QUEUE */}
          <div className="col-md-4 col-lg-3 h-100 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0 text-uppercase" style={{ fontSize: "12px", fontWeight: "800", color: "#64748b", letterSpacing: "1px" }}>Active Queue</h6>
              <span className="badge" style={{ background: "#eff6ff", color: "#0d6efd", borderRadius: "6px" }}>{reviews.length} Cases</span>
            </div>

            <div style={{ flex: 1, overflowY: "auto", paddingRight: "5px" }}>
              {reviews.map((review) => (
                <div
                  key={review._id}
                  onClick={() => {
                    setSelectedReview(review);
                    setSelectedDisease(null);
                    setDoctorResponse("");
                    setDoctorNotes("");
                  }}
                  style={{
                    padding: "16px", borderRadius: "16px", marginBottom: "12px", cursor: "pointer",
                    border: selectedReview?._id === review._id ? "2px solid #0d6efd" : "1px solid #e2e8f0",
                    background: selectedReview?._id === review._id ? "#fff" : "#fff",
                    boxShadow: selectedReview?._id === review._id ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "0 2px 4px rgba(0,0,0,0.02)",
                    transition: "0.2s"
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div style={{ fontWeight: "700", fontSize: "16px", color: "#0f172a" }}>{review.user?.name}</div>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="text-truncate" style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>
                    {review.symptoms}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge" style={{ background: "#f1f5f9", color: "#475569", fontWeight: "600" }}>{review.user?.age}Y • {review.user?.gender}</span>
                    <span className="badge" style={{ background: review.status === "pending" ? "#fef2f2" : "#d1fae5", color: review.status === "pending" ? "#dc2626" : "#065f46", fontWeight: "600" }}>{
                          review.status === "pending"
                            ? "Pending"
                            : "Done"
                        }</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL: CASE DETAIL */}
          <div className="col-md-8 col-lg-9 h-100">
            {!selectedReview ? (
              <div className="h-100 d-flex flex-column align-items-center justify-content-center bg-white shadow-sm" style={{ borderRadius: "24px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📁</div>
                <h5 style={{ fontWeight: "700", color: "#0f172a" }}>No case selected</h5>
                <p style={{ color: "#64748b" }}>Please select a patient from the queue to review.</p>
              </div>
            ) : (
              <div className="h-100 bg-white shadow-sm d-flex flex-column" style={{ borderRadius: "24px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                
                {/* CASE HEADER */}
                <div className="p-4 border-bottom d-flex justify-content-between align-items-center" style={{ background: "#fff" }}>
                  <div className="d-flex align-items-center">
                    <div style={{ width: "48px", height: "48px", background: "#f1f5f9", borderRadius: "12px", display: "flex", alignItems: "center", justify: "center", fontSize: "20px", marginRight: "16px" }}>📄</div>
                    <div>
                      <h4 className="mb-1" style={{ fontWeight: "800", color: "#0f172a" }}>Case {selectedReview._id?.slice(-5).toUpperCase()}</h4>
                      <div style={{ fontSize: "14px", color: "#64748b" }}>{selectedReview.user?.name} • Age {selectedReview.user?.age} • Submitted {new Date(selectedReview.createdAt).toLocaleString()}</div>
                    </div>
                  </div>

                </div>

                <div className="flex-grow-1 overflow-auto p-4">
                  {/* PATIENT SUMMARY */}
                  <div className="mb-4">
                    <h6 className="text-uppercase mb-3" style={{ fontSize: "12px", fontWeight: "800", color: "#94a3b8", letterSpacing: "1px" }}>Patient Chat Summary</h6>
                    <div className="p-3" style={{ background: "#f8fafc", borderRadius: "16px", border: "1px solid #e2e8f0", color: "#334155", lineHeight: "1.6" }}>
                      {selectedReview.symptoms}
                    </div>
                  </div>

                  {/* ML PREDICTIONS */}
                  <h6 className="text-uppercase mb-3" style={{ fontSize: "12px", fontWeight: "800", color: "#94a3b8", letterSpacing: "1px" }}>ML Predictions & Analysis</h6>
                  <div className="row g-3">
                    {selectedReview.predictedDiseases?.map((disease, index) => {
                      const isSelected = selectedDisease?.disease === disease.disease;
                      return (
                        <div key={index} className="col-12">
                          <div
                            onClick={() => {
                              setSelectedDisease(disease);
                              setDoctorResponse(selectedReview.aiResponse?.find(item => item.disease === disease.disease)?.response || "");
                            }}
                            style={{
                              border: isSelected ? "2px solid #0d6efd" : "1px solid #e2e8f0",
                              borderRadius: "20px", padding: "24px", cursor: "pointer",
                              background: isSelected ? "#f8faff" : "#fff",
                              transition: "0.2s"
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h5 className="mb-0" style={{ fontWeight: "700", color: "#0f172a" }}>{disease.disease}</h5>
                              <div className="d-flex align-items-center">
                                {isSelected && <span className="badge" style={{ background: "#0d6efd", color: "#fff", borderRadius: "30px" }}>Selected Diagnosis</span>}
                              </div>
                            </div>
                            
                            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "16px" }}>
                              <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "inherit", color: "#475569", fontSize: "14px", lineHeight: "1.7" }}>
                                {selectedReview.aiResponse?.find(item => item.disease === disease.disease)?.response}
                              </pre>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <textarea
  className="form-control mb-4"
  rows={10}
  placeholder="Modify AI response..."

  value={doctorResponse}

  onChange={(e) =>
    setDoctorResponse(
      e.target.value
    )
  }

  style={{
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    padding: "16px",
    fontSize: "15px",
    background: "#f8fafc"
  }}
/>

                  {/* CLINICIAN NOTES */}
                  <div className="mt-5">
                    <h6 className="text-uppercase mb-3" style={{ fontSize: "12px", fontWeight: "800", color: "#94a3b8", letterSpacing: "1px" }}>Clinician Decision & Notes</h6>
                    <textarea
                      className="form-control mb-4"
                      rows={4}
                      placeholder="Add your assessment, treatment plan, or follow-up instructions..."
                      value={doctorNotes}
                      onChange={(e) => setDoctorNotes(e.target.value)}
                      style={{ borderRadius: "16px", border: "1px solid #e2e8f0", padding: "16px", fontSize: "15px", background: "#f8fafc" }}
                    />

                    {/* ACTION BUTTONS */}
                    <div className="d-flex gap-3 pb-4">
                      <button
                        className="btn flex-grow-1"
                        disabled={!selectedDisease}
                        onClick={() => handleApprove(selectedReview._id)}
                        style={{ height: "52px", borderRadius: "12px", background: "#0d6efd", color: "#fff", fontWeight: "700", border: "none" }}
                      >
                        Confirm & Mark Reviewed
                      </button>
                      <button
                        className="btn flex-grow-1"
                        disabled={!selectedDisease}
                        onClick={() => handleEdit(selectedReview._id)}
                        style={{ height: "52px", borderRadius: "12px", background: "#fff", color: "#0d6efd", fontWeight: "700", border: "1px solid #0d6efd" }}
                      >
                        Modify Response
                      </button>
                      <button
                        className="btn px-4"
                        onClick={() => handleReject(selectedReview._id)}
                        style={{ height: "52px", borderRadius: "12px", background: "#fee2e2", color: "#ef4444", fontWeight: "700", border: "none" }}
                      >
                        Flag / Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;