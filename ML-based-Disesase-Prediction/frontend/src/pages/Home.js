import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import ChatArea from "../components/Chat/ChatArea";
import { getHistoryAPI } from "../api/chat.api";

const Home = () => {
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [dark, setDark] =
  useState(
    localStorage.getItem("theme")
    === "dark"
  );

  const fetchHistory = async () => {
    try {
      const res = await getHistoryAPI();
      setHistory(res || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
       background:
  dark
    ? "#0f172a"
    : "#f8fafc", // Clean clinical grey-white
        overflow: "hidden",
        position: "relative"
      }}
    >
      {/* SIDEBAR - Managed with a smooth CSS transition */}
      <Sidebar
        history={history}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        setSelectedChat={setSelectedChat}
        dark={dark}
        setDark={setDark}
      />

      {/* TOP NAVIGATION BAR */}
      <Navbar sidebarOpen={sidebarOpen} dark={dark} />

      {/* MAIN CONTENT AREA */}
      <div
        style={{
          marginLeft: sidebarOpen ? "260px" : "0px",
          marginTop: "64px", // Matches Navbar height
          height: "calc(100vh - 64px)",
          transition: "all 0.3s ease",
          background: dark ? "#0f172a" : "#f8fafc",
          position: "relative"
        }}
      >
        <ChatArea
          sidebarOpen={sidebarOpen }
          refreshHistory={fetchHistory}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          dark={dark}
        />
      </div>
    </div>
  );
};

export default Home;