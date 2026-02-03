import { useEffect } from "react";

const APP_NAME = "LHC";

export const usePageTitle = (title: string) => {
  useEffect(() => {
    const fullTitle = title ? `${title}` : APP_NAME;
    document.title = fullTitle;

    // Optional: cleanup khi component unmount (nếu cần reset về default)
    return () => {
      document.title = APP_NAME;
    };
  }, [title]);
};
