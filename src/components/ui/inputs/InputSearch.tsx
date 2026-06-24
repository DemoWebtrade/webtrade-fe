import { LIST_BANKS } from "@/configs";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { LanguageKey } from "@/types";
import { getBankLogo } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Dot, Search } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  List,
  type ListImperativeAPI,
  type RowComponentProps,
} from "react-window";

type RowProps = {
  filteredBanks: Bank[];
  currentLang: LanguageKey;
  selectedBank: string | null;
  highlightedIndex: number;
  onSelect: (bank: Bank) => void;
};

type Bank = {
  pkBank: string;
  bankCode: string;
  bankName: string;
  shortName: string | null;
  englishBankName: string | null;
  onlineVpb: string | null;
  bankKey: string | null;
  flagForeign: number;
};

type InputSearchFieldProps<TForm extends FieldValues = FieldValues> = {
  label?: string;
  required?: boolean;
  name: Path<TForm>;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  onBankSelect?: (bank: Bank) => void;
  setValue?: UseFormSetValue<TForm>;
};

export const InputSearchField = <TForm extends FieldValues = FieldValues>({
  label,
  required,
  name,
  registration,
  disabled,
  error,
  placeholder = "Tìm kiếm ngân hàng...",
  className,
  onBankSelect,
  setValue,
}: InputSearchFieldProps<TForm>) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const currentLang = (i18n.resolvedLanguage ||
    i18n.language ||
    "vi") as LanguageKey;

  const [isOpen, setIsOpen] = useState(false);
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>(LIST_BANKS);
  const [searchValue, setSearchValue] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<ListImperativeAPI>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      setSelectedBank(null);
      setIsOpen(true);

      const filtered = LIST_BANKS.filter(
        (bank) =>
          bank?.bankName.toLowerCase().includes(value.toLowerCase()) ||
          bank?.bankCode.toLowerCase().includes(value.toLowerCase()) ||
          (bank?.englishBankName?.toLowerCase().includes(value.toLowerCase()) ??
            false),
      );
      setFilteredBanks(filtered);
      setHighlightedIndex(-1);

      registration?.onChange?.(e);
    },
    [registration],
  );

  const handleBankSelect = useCallback(
    (bank: Bank) => {
      const displayName =
        currentLang === "vi"
          ? bank?.bankName
          : (bank?.englishBankName ?? bank?.bankName);

      setSearchValue(displayName);
      onBankSelect?.(bank);
      setSelectedBank(bank?.bankCode || "");
      setIsOpen(false);
      setHighlightedIndex(-1);
      setFilteredBanks([bank]);
      setValue?.(name, bank?.bankCode as PathValue<TForm, typeof name>, {
        shouldValidate: true,
      });
    },
    [currentLang, onBankSelect, setValue, name],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      if (filteredBanks.length === 0) return;

      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
        listRef.current?.scrollToRow({ index: 0, align: "auto" });
        return;
      }

      const lastIndex = filteredBanks.length - 1;
      const nextIndex =
        e.key === "ArrowDown"
          ? highlightedIndex < lastIndex
            ? highlightedIndex + 1
            : 0
          : highlightedIndex > 0
            ? highlightedIndex - 1
            : lastIndex;

      setHighlightedIndex(nextIndex);
      listRef.current?.scrollToRow({ index: nextIndex, align: "auto" });
      return;
    }

    if (e.key === "Enter") {
      if (isOpen && highlightedIndex >= 0 && filteredBanks[highlightedIndex]) {
        e.preventDefault();
        handleBankSelect(filteredBanks[highlightedIndex] as Bank);
      }
      return;
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  useClickOutside(containerRef, () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    if (!selectedBank) {
      setSearchValue("");
      setFilteredBanks(LIST_BANKS);
    }
  });

  function RowComponent({
    index,
    style,
    filteredBanks,
    currentLang,
    selectedBank,
    highlightedIndex,
    onSelect,
  }: RowComponentProps<RowProps>) {
    const isSelected = selectedBank === filteredBanks?.[index]?.bankCode;
    const isHighlighted = highlightedIndex === index;

    return (
      <div
        key={filteredBanks?.[index]?.bankCode}
        onClick={() => onSelect(filteredBanks?.[index] as Bank)}
        className={`${isSelected ? "bg-purple-selected" : isHighlighted ? "bg-purple-hover" : ""} hover:bg-purple-hover px-4 flex items-center gap-4 cursor-pointer transition-colors`}
        style={style}
      >
        <img
          src={getBankLogo(filteredBanks?.[index]?.bankCode)}
          alt={filteredBanks?.[index]?.bankName}
          className="w-8 h-8 rounded-full object-cover shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <h2 className="text-sm font-medium truncate">
            {currentLang === "vi"
              ? filteredBanks?.[index]?.bankName
              : (filteredBanks?.[index]?.englishBankName ??
                filteredBanks?.[index]?.bankName)}
          </h2>
          <p className="flex flex-row items-center text-xs text-content-tertiary">
            {t("user.code")}: {filteredBanks?.[index]?.bankKey || "-"} <Dot />{" "}
            {filteredBanks?.[index]?.bankCode}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-normal mb-2" htmlFor={name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative" ref={containerRef}>
        <input
          name={name}
          id={name}
          className={`
            w-full px-3 py-2.5 rounded bg-bg-secondary text-sm text-content-base
            outline-none transition border focus:border-outline-selected
            ${error ? "border-red-500" : "border-outline-base"}
            ${className ?? ""}
          `}
          type="text"
          {...registration}
          disabled={disabled}
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.currentTarget.select()
          }
          autoComplete="off"
        />

        <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-content-disable pointer-events-none">
          <Search size={18} />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[calc(100%+6px)] left-0 w-full bg-bg-tertiary border border-outline-base rounded-md shadow-xl z-50 overflow-hidden"
            >
              {filteredBanks.length === 0 ? (
                <div className="grid place-items-center h-13 px-4 text-center text-content-tertiary text-sm">
                  {t("banks-not-found")}
                </div>
              ) : (
                <List
                  id={`${name}-bank-list`}
                  listRef={listRef}
                  className="max-h-50! overflow-auto!"
                  rowComponent={RowComponent}
                  rowCount={filteredBanks.length}
                  rowProps={{
                    filteredBanks,
                    currentLang,
                    onSelect: handleBankSelect,
                    selectedBank,
                    highlightedIndex,
                  }}
                  rowHeight={52}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <div className="text-red-500 text-xs mt-1">{error.message}</div>
      )}
    </div>
  );
};
