import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { useThemeStore } from "../../stores/themeStore";

function AdminLayout({ children }) {
  const { theme } = useThemeStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // You can update this to match your topbar's fixed height
  const TOPBAR_HEIGHT = 56; 

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false); // reset sidebar on desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`d-flex ${theme}`} style={{ minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px)` }}>
      {/* Sidebar */}
      <AdminSidebar
        isOpen={!isMobile || sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
        theme={theme}
        topBarHeight={TOPBAR_HEIGHT}
      />

      {/* Main Content */}
      <main
        className={`flex-grow-1 p-4 ${
          theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
        }`}
        style={{
          marginLeft: !isMobile ? 220 : 0,
          transition: "margin-left 0.3s ease",
          minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
