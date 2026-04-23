import Header from "@/components/features/header";
import MainJoyride from "@/components/features/joyride/MainJoyride";
import Toaster from "@/components/features/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import { requestPermission } from "@/services/fcm/firebase-messaging";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export default function MainLayout() {
  const [openMainJoyride, setOpenMainJoyride] = useState(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour") === "true";
    return !hasSeenTour;
  });

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour") === "true";
    if (!hasSeenTour) return;

    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
      setTimeout(() => requestPermission(), 1000);
    }
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="mode-ui-theme">
      <main className="h-screen flex flex-col gap-2 text-content-primary! bg-bg-primary!">
        <div className="h-12">
          <Header />
        </div>
        <div className="flex-1 px-1 pb-1">
          <Outlet />
        </div>
      </main>

      {/* Hướng dẫn các chức năng trong web */}
      <MainJoyride
        isOpen={openMainJoyride}
        onClose={() => setOpenMainJoyride(false)}
      />

      <Tooltip id="global-tooltip" />

      <Toaster />
    </ThemeProvider>
  );
}
