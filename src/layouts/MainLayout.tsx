import Profile from "@/components/features/auth/profile";
import Header from "@/components/features/header";
import Menu from "@/components/features/menu";
import Toaster from "@/components/features/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import {
  onMessageListener,
  requestPermission,
} from "@/services/fcm/firebase-messaging";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  selectIsOpenProfile,
  selectToken,
  selectTypeUpdateProfile,
} from "@/store/modules/auth/selector";
import { setIsOpenProfile } from "@/store/modules/auth/slice";
import type { MessagePayload } from "firebase/messaging";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { toast } from "sonner";

const MainJoyride = lazy(
  () => import("@/components/features/joyride/MainJoyride"),
);

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isOpenProfile = useAppSelector(selectIsOpenProfile);
  const typeUpdateProfile = useAppSelector(selectTypeUpdateProfile);

  const refProfile = useRef<HTMLDivElement>(null);

  const [openMainJoyride, setOpenMainJoyride] = useState(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour") === "true";
    return !hasSeenTour;
  });

  const token = useAppSelector(selectToken);

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

  // Check login
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useClickOutside(refProfile, () => {
    if (!typeUpdateProfile || !isOpenProfile) dispatch(setIsOpenProfile(false));
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="mode-ui-theme">
      <main className="h-screen flex flex-col text-content-primary! bg-bg-primary!">
        <div className="h-12">
          <Header />
        </div>
        <div className="flex-1 px-1 pb-1 relative">
          <Menu />

          <Outlet />

          {/* Thông tin tài khoản */}
          <div ref={refProfile}>
            <AnimatePresence>
              {isOpenProfile && <Profile key="profile" />}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Hướng dẫn các chức năng trong web */}
      <Suspense fallback={<div>Loading ...</div>}>
        <MainJoyride
          isOpen={openMainJoyride}
          onClose={() => setOpenMainJoyride(false)}
        />
      </Suspense>

      <Tooltip id="global-tooltip" />

      <Toaster />
    </ThemeProvider>
  );
}
