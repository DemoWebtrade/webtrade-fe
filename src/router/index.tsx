import LogoBarLoading from "@/components/features/ui/LogoProgressLoading";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const PriceBoardPage = lazy(() => import("@/pages/PriceBoardPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LogoBarLoading />}>
        <Routes>
          {/* Public layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<PriceBoardPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
