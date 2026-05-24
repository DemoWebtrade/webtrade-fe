import i18n from "@/lib/i18n";
import axios from "axios";

export function getMessageFromError(error: unknown): string {
  let errorMessage = i18n.t("api.error");
  if (axios.isAxiosError(error)) {
    // Nếu server trả về JSON chứa msg
    errorMessage = error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  return errorMessage;
}
