import LogoBarLoading from "@/components/ui/LogoProgressLoading";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const PriceBoardPage = lazy(() => import("@/pages/PriceBoardPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const OrderPage = lazy(() => import("@/pages/OrderPage"));
const StatementPage = lazy(() => import("@/pages/StatementPage"));
const AssetPage = lazy(() => import("@/pages/AssetPage"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LogoBarLoading />}>
        <Routes>
          {/* Public layout */}
          <Route element={<MainLayout />}>
            {/* Price board */}
            <Route path="/" element={<PriceBoardPage />} />

            {/* Order */}
            <Route path="/order" element={<OrderPage />} />

            {/* Asset */}
            <Route path="/asset" element={<AssetPage />} />

            {/* Statement */}
            <Route path="/statement" element={<StatementPage />} />
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
