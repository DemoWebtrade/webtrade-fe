import ProgessLoader from "@/components/features/skeletons/ProgessLoader";
import Toaster from "@/components/features/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import RegisterHeader from "@/features/register/header";
import { usePageTitle } from "@/hooks/usePageTitle";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";

const RegisterStep = lazy(() => import("@/features/register/step/index"));

export default function RegisterPage() {
  const { t } = useTranslation();

  usePageTitle(t("register.title"));

  return (
    <ThemeProvider defaultTheme="dark" storageKey="mode-ui-theme">
      <main className="h-screen flex flex-col gap-2 text-content-primary! bg-bg-primary!">
        <div className="h-12">
          <RegisterHeader />
        </div>
        <div className="flex-1 px-1 pb-1">
          <Suspense fallback={<ProgessLoader />}>
            <RegisterStep />
          </Suspense>
        </div>
      </main>

      <Tooltip id="global-tooltip" />

      <Toaster />
    </ThemeProvider>
  );
}
