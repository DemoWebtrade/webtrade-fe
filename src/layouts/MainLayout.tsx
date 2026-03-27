import Header from "@/components/features/header";
import { ThemeProvider } from "@/context/ThemeContext";
import { Outlet } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export default function MainLayout() {
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

      <Tooltip id="global-tooltip" />
    </ThemeProvider>
  );
}
