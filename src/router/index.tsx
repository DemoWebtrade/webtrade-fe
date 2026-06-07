import LogoBarLoading from "@/components/ui/LogoProgressLoading";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const PriceBoardPage = lazy(() => import("@/pages/PriceBoardPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LogoBarLoading />}>
        <Routes>
          {/* Public layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<PriceBoardPage />} />
          </Route>

          {/* Auth */}
          <Route path="/register" element={<RegisterPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
