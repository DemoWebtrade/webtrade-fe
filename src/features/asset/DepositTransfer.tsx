import { useState } from "react";
import { useTranslation } from "react-i18next"; // đổi lại theo hook i18n thực tế của bạn nếu khác

const QUICK_AMOUNTS = [100000, 500000, 1000000, 2000000, 5000000];

function formatVND(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("vi-VN");
}

export default function DepositTransfer() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"deposit" | "transfer">("deposit");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [recipient, setRecipient] = useState("");

  return (
    <>
      {/* Header + tab switcher */}
      <div className="px-2 py-1 flex flex-wrap items-center justify-between gap-2 border-b border-border">
        <h1 className="md:text-base text-sm font-medium">
          {tab === "deposit" ? t("wallet.deposit") : t("wallet.transfer")}
        </h1>

        <div className="flex bg-bg-primary rounded-md p-0.5 text-xs md:text-sm">
          <button
            type="button"
            onClick={() => setTab("deposit")}
            className={`px-1 md:px-3 py-1 rounded-md transition-colors text-xs md:text-sm ${
              tab === "deposit"
                ? "bg-bg-secondary text-fg-primary shadow-sm"
                : "text-fg-secondary"
            }`}
          >
            {t("button.deposit-money")}
          </button>
          <button
            type="button"
            onClick={() => setTab("transfer")}
            className={`px-1 md:px-3 py-1 rounded-md transition-colors text-xs md:text-sm ${
              tab === "transfer"
                ? "bg-bg-secondary text-fg-primary shadow-sm"
                : "text-fg-secondary"
            }`}
          >
            {t("button.trans-money")}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
        {tab === "transfer" && (
          <div className="flex flex-col gap-1">
            <label className="text-xs text-fg-secondary">
              {t("wallet.recipient-account")}
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={t("wallet.recipient-placeholder") as string}
              className="border border-border rounded-md px-3 py-2 text-sm bg-bg-primary text-fg-primary focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-xs text-fg-secondary">
            {t("wallet.amount")}
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(formatVND(e.target.value))}
              placeholder="0"
              className="w-full border border-border rounded-md pl-3 pr-12 py-2 text-sm bg-bg-primary text-fg-primary text-right focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-fg-secondary">
              đ
            </span>
          </div>

          {tab === "deposit" && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {QUICK_AMOUNTS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAmount(v.toLocaleString("vi-VN"))}
                  className="text-xs px-2 py-1 rounded-md border border-border text-fg-secondary hover:border-brand hover:text-brand transition-colors"
                >
                  {v.toLocaleString("vi-VN")}
                </button>
              ))}
            </div>
          )}
        </div>

        {tab === "transfer" && (
          <div className="flex flex-col gap-1">
            <label className="text-xs text-fg-secondary">
              {t("wallet.note")}
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t("wallet.note-placeholder") as string}
              className="border border-border rounded-md px-3 py-2 text-sm bg-bg-primary text-fg-primary focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        )}
      </div>

      {/* Footer action */}
      <div className="p-3 border-t border-border">
        <button
          type="button"
          disabled={!amount || (tab === "transfer" && !recipient)}
          className="w-full py-2 rounded-md bg-brand text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {tab === "deposit"
            ? t("wallet.confirm-deposit")
            : t("wallet.confirm-transfer")}
        </button>
      </div>
    </>
  );
}
