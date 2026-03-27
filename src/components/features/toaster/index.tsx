import { useTheme } from "@/hooks/useTheme";
import { Toaster as SonnerToaster, type ToasterProps } from "sonner";

export default function Toaster() {
  const { theme } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      position="top-right"
    />
  );
}
