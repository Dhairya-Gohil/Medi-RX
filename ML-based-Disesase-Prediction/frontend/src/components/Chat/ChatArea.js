import { useEffect, useRef, useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import { sendMessageAPI } from "../../api/chat.api";

const ChatArea = ({ sidebarOpen, refreshHistory, selectedChat, setSelectedChat, dark }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatDiseaseSections = (text) => {
    if (!text) return [];
    if (typeof text !== "string") text = JSON.stringify(text);
    const cleanText = text.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/^"|"$/g, "");
    if (!cleanText.includes("Disease Name:")) return [{ raw: cleanText }];
    return cleanText.split("Disease Name:").filter(Boolean).map((section) => {
      const lines = section.trim().split("\n");
      return { diseaseName: lines[0]?.trim(), fullText: lines.slice(1).join("\n") };
    });
  };

  useEffect(() => {
    if (!selectedChat) { setMessages([]); setChatId(null); return; }
    setChatId(selectedChat.id);
    const formattedMessages = selectedChat.messages.map((msg) => ({
      type: msg.role === "user" ? "user" : "bot",
      text: msg.content,
      reviewStatus: msg.reviewStatus || null,
      doctorNotes: msg.doctorNotes || "",
      selectedDisease: msg.selectedDisease || ""
    }));
    setMessages(formattedMessages);
  }, [selectedChat]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
    setInput("");
    setLoading(true);
    try {
      const res = await sendMessageAPI({ message: userMessage, chatId });
      setMessages((prev) => [...prev, { type: "bot", text: res.reply, reviewStatus: "pending" }]);
      if (!chatId) {
        setChatId(res.chatId);
        setSelectedChat({ id: res.chatId, title: userMessage.substring(0, 40), messages: res.messages });
      }
      refreshHistory();
    } catch (error) {
      setMessages((prev) => [...prev, { type: "bot", text: "Something went wrong." }]);
    }
    setLoading(false);
  };

  // Helper for Status Badges
  const StatusBadge = ({ status }) => {
    const config = {
      pending: { color: "#f59e0b", bg: "#fef3c7", icon: "⏳", text: "Waiting for verification" },
      approved: { color: "#10b981", bg: "#d1fae5", icon: "✅", text: "Verified by Doctor" },
      edited: { color: "#3b82f6", bg: "#dbeafe", icon: "✏️", text: "Edited by Doctor" },
      rejected: { color: "#ef4444", bg: "#fee2e2", icon: "❌", text: "Rejected" }
    };
    const s = config[status];
    if (!s) return null;
    return (
      <div style={{ 
        display: "inline-flex", alignItems: "center", padding: "4px 12px", 
        borderRadius: "20px", background: s.bg, color: s.color, 
        fontSize: "12px", fontWeight: "700", marginTop: "12px" 
      }}>
        <span className="me-1">{s.icon}</span> {s.text}
      </div>
    );
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: dark ? "#1e293b" : "#f8fafc" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "40px 20px 140px" }}>
        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
          {messages.length === 0 ? <WelcomeScreen dark={dark} /> : (
            messages.map((msg, index) => {
              let diseaseSections = [];

if (msg.type === "bot") {

  try {

    const parsed =
      JSON.parse(msg.text);

    if (Array.isArray(parsed)) {

      diseaseSections =
        parsed.map((item) => ({

          diseaseName:
            item.disease,

          fullText:
            item.response
        }));

    } else {

      diseaseSections = [{
        fullText: msg.text
      }];
    }

  } catch {

    diseaseSections = [{
      fullText: msg.text
    }];
  }
}
              return (
                <div key={index} style={{ display: "flex", justifyContent: msg.type === "user" ? "flex-end" : "flex-start", marginBottom: "32px" }}>
                  <div style={{ maxWidth: "85%" }}>
                    {msg.type === "user" ? (
                      <div style={{ padding: "14px 20px", borderRadius: "20px 20px 4px 20px", background: "#0d6efd", color: "#fff", boxShadow: "0 4px 12px rgba(13, 110, 253, 0.15)", fontSize: "15px", lineHeight: "1.6" }}>
                        {msg.text}
                      </div>
                    ) : (
                      <div>
                        {diseaseSections.map((section, idx) => (
                          <div key={idx} style={{ background: dark ? "#334155" : "#fff", border: `1px solid ${dark ? '#475569' : '#e2e8f0'}`, borderRadius: "20px", padding: "24px", marginBottom: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
                            {section.diseaseName && (
                              <div className="d-flex align-items-center mb-3">
                                <div style={{ background: dark ? "#1e293b" : "#eff6ff", padding: "8px", borderRadius: "10px", marginRight: "12px" }}>🦠</div>
                                <h5 className="mb-0" style={{ fontWeight: "700", color: dark ? "#f8fafc" : "#0f172a" }}>{section.diseaseName}</h5>
                              </div>
                            )}
                            {String(
                                section.fullText || ""
                              ).split("\n\n").map((block, bIdx) => (
                              <div key={bIdx} style={{ background: dark ? "#1e293b" : "#f8fafc", borderRadius: "12px", padding: "16px", marginBottom: "12px", fontSize: "14px", color: dark ? "#94a3b8" : "#475569", border: `1px solid ${dark ? '#475569' : '#f1f5f9'}`, lineHeight: "1.7" }}>
                                {block}
                              </div>
                            ))}
                          </div>
                        ))}
                        
                        <StatusBadge status={msg.reviewStatus} />

                        {msg.selectedDisease && (
                          <div className="mt-2 p-2 px-3 d-inline-block" style={{ background: dark ? "#1e293b" : "#eff6ff", color: dark ? "#0d6efd" : "#0d6efd", borderRadius: "10px", fontSize: "13px", fontWeight: "600", border: `1px solid ${dark ? '#475569' : '#dbeafe'}` }}>
                            Diagnosis: {msg.selectedDisease}
                          </div>
                        )}

                        {msg.doctorNotes && (
                          <div className="mt-3 p-3" style={{ background: dark ? "#1e293b" : "#fffbeb", border: `1px solid ${dark ? '#475569' : '#fef3c7'}`, borderRadius: "16px", fontSize: "14px", color: dark ? "#f8fafc" : "#92400e" }}>
                            <div className="fw-bold mb-1">📋 Doctor Notes</div>
                            {msg.doctorNotes}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          {loading && (
            <div className="d-flex align-items-center gap-2" style={{ color: "#64748b", fontSize: "14px" }}>
              <div className="spinner-grow spinner-grow-sm text-primary"></div> Analyzing symptoms...
            </div>
          )}
          <div ref={bottomRef}></div>
        </div>
      </div>

      {/* INPUT BAR */}
      <div style={{ position: "fixed", bottom: 0, left: sidebarOpen ? "260px" : "0px", width: sidebarOpen ? "calc(100% - 260px)" : "100%", background: dark ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10px)", borderTop: "1px solid #e2e8f0", padding: "20px", transition: "all 0.3s ease", zIndex: 100 }}>
        <div style={{ maxWidth: "850px", margin: "0 auto", display: "flex", gap: "12px", background: dark ? "#1e293b" : "#fff", padding: "8px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Describe what you're feeling — symptoms, when they started, severity..." style={{ flex: 1, border: "none", padding: "10px 16px", outline: "none", fontSize: "15px" }} />
          <button onClick={handleSend} style={{ border: "none", background: "#0d6efd", color: "#fff", width: "44px", height: "44px", borderRadius: "12px", transition: "0.2s" }}>➤</button>
        </div>
        <div className="text-center mt-2" style={{ fontSize: "11px", color: dark ? "#94a3b8" : "#94a3b8" }}>Decision support tool. Always confirm with a licensed clinician.</div>
      </div>
    </div>
  );
};

export default ChatArea;