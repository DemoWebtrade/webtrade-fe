import Header from "@/components/features/header";
import Toaster from "@/components/features/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import {
  onMessageListener,
  requestPermission,
} from "@/services/fcm/firebase-messaging";
import type { MessagePayload } from "firebase/messaging";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { toast } from "sonner";

export default function MainLayout() {
  // const [openMainJoyride, setOpenMainJoyride] = useState(() => {
  //   const hasSeenTour = localStorage.getItem("hasSeenTour") === "true";
  //   return !hasSeenTour;
  // });

  // Xin quyền thông báo khi app load
  useEffect(() => {
    requestPermission();
  }, []);

  // Lắng nghe thông báo khi app mở
  useEffect(() => {
    const unsubscribe = onMessageListener((payload: MessagePayload) => {
      const body = payload.notification?.body ?? "";
      toast.info(body);
    });

    return () => unsubscribe();
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
      {/* <MainJoyride
        isOpen={openMainJoyride}
        onClose={() => setOpenMainJoyride(false)}
      /> */}

      <Tooltip id="global-tooltip" />

      <Toaster />
    </ThemeProvider>
  );
}
