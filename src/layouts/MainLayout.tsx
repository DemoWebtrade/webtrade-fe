import Header from "@/components/features/header";
import { ThemeProvider } from "@/context/ThemeContext";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="mode-ui-theme">
      <main className="bg-bg-primary text-content-primary h-screen flex flex-col gap-1">
        <div className="h-12">
          <Header />
        </div>
        <div className="flex-1 px-1">
          <Outlet />
        </div>
      </main>
    </ThemeProvider>
  );
}
