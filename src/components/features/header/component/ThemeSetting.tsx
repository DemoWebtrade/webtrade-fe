import { useTheme } from "@/hooks/useTheme";
import { Sun, SunMoon } from "lucide-react";

export default function ThemeSetting() {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div
      className="md:h-9 h-8 p-1 rounded-2xl bg-bg-red w-14 md:w-16 cursor-pointer group"
      onClick={handleChangeTheme}
    >
      <div className="w-full h-full flex flex-row items-center justify-between relative">
        <div
          className={`absolute top-0 h-full w-1/2 rounded-2xl bg-red-active group-hover:bg-red-hover bg-switch pointer-events-none ${
            theme === "light" ? "left-1/2" : "left-0"
          }`}
        />

        <div className="relative z-10 w-1/2 h-full flex items-center justify-center">
          <Sun className="size-4 md-size-6" />
        </div>

        <div className="relative z-10 w-1/2 h-full flex items-center justify-center">
          <SunMoon className="size-4 md-size-6" />
        </div>
      </div>
    </div>
  );
}
