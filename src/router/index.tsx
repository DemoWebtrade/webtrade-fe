import LogoBarLoading from "@/components/features/ui/LogoProgressLoading";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const PriceBoard = lazy(() => import("@/pages/PriceBoardPage"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LogoBarLoading />}>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/price-board" replace />} />

          {/* Public layout */}
          <Route element={<MainLayout />}>
            <Route path="/price-board" element={<PriceBoard />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
