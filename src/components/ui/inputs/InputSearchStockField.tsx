import { LIST_STOCKS } from "@/configs";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { LanguageKey, StockListItem } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
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
  filteredStocks: StockListItem[];
  currentLang: LanguageKey;
  selectedStock: string | null;
  highlightedIndex: number;
  onSelect: (stock: StockListItem) => void;
};

type InputSearchStockFieldProps<TForm extends FieldValues = FieldValues> = {
  label?: string;
  required?: boolean;
  name: Path<TForm>;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  isClearValue?: boolean;
  onStockSelect?: (stock: StockListItem) => void;
  setValue?: UseFormSetValue<TForm>;
};

const TYPE_ORDER: Record<string, number> = {
  s: 0, // Cổ phiếu
  f: 1, // Phái sinh
  b: 2, // Trái phiếu
  w: 3, // Chứng quyền
  e: 4, // ETF
  i: 5, // Cổ phiếu
  m: 6, // Chứng chỉ quỹ
};

const TYPE_LABEL: Record<string, string> = {
  s: "input.product-stock",
  f: "input.product-derivatives",
  b: "input.product-bonds",
  w: "input.product-coveredWarrants",
  e: "input.product-etf",
  i: "input.product-stock",
  m: "input.product-fundCertificate",
};

export const InputSearchStockField = <TForm extends FieldValues = FieldValues>({
  label,
  required,
  name,
  registration,
  disabled,
  error,
  placeholder = "Tìm kiếm ngân hàng...",
  className,
  isClearValue,
  onStockSelect,
  setValue,
}: InputSearchStockFieldProps<TForm>) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const currentLang = (i18n.resolvedLanguage ||
    i18n.language ||
    "vi") as LanguageKey;

  const sortedStocks = useMemo(
    () =>
      [...(LIST_STOCKS ?? [])].sort((a, b) => {
        const typeDiff =
          (TYPE_ORDER[a.type] ?? 99) - (TYPE_ORDER[b.type] ?? 99);
        if (typeDiff !== 0) return typeDiff;
        return a.code.localeCompare(b.code);
      }),
    [],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [filteredStocks, setFilteredStocks] =
    useState<StockListItem[]>(sortedStocks);
  const [searchValue, setSearchValue] = useState("");
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<ListImperativeAPI>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      setSelectedStock(null);
      setIsOpen(true);

      const filtered = sortedStocks.filter((stock) =>
        stock?.code.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredStocks(filtered);
      setHighlightedIndex(-1);

      registration?.onChange?.(e);
    },
    [registration, sortedStocks],
  );

  const handleStockSelect = useCallback(
    (stock: StockListItem) => {
      if (isClearValue) {
        setSearchValue("");
        onStockSelect?.(stock);
        setFilteredStocks(sortedStocks);
      } else {
        setSearchValue(stock?.code);
        onStockSelect?.(stock);
        setSelectedStock(stock?.code || "");
        setHighlightedIndex(-1);
        setFilteredStocks([stock]);
        setValue?.(name, stock?.code as PathValue<TForm, typeof name>, {
          shouldValidate: true,
        });
      }

      setIsOpen(false);
    },
    [onStockSelect, setValue, name, isClearValue, sortedStocks],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      if (filteredStocks.length === 0) return;

      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
        listRef.current?.scrollToRow({ index: 0, align: "auto" });
        return;
      }

      const lastIndex = filteredStocks.length - 1;
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
      if (isOpen && highlightedIndex >= 0 && filteredStocks[highlightedIndex]) {
        e.preventDefault();
        handleStockSelect(filteredStocks[highlightedIndex] as StockListItem);
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
    if (!selectedStock) {
      setSearchValue("");
      setFilteredStocks(sortedStocks);
    }
  });

  function RowComponent({
    index,
    style,
    filteredStocks,
    currentLang,
    selectedStock,
    highlightedIndex,
    onSelect,
  }: RowComponentProps<RowProps>) {
    const isSelected = selectedStock === filteredStocks?.[index]?.code;
    const isHighlighted = highlightedIndex === index;

    return (
      <div
        key={filteredStocks?.[index]?.code}
        onClick={() => onSelect(filteredStocks?.[index] as StockListItem)}
        className={`${isSelected ? "bg-purple-selected" : isHighlighted ? "bg-purple-hover" : ""} hover:bg-purple-hover px-2 flex items-center gap-4 cursor-pointer transition-colors`}
        style={style}
      >
        <div className="grid grid-cols-[1fr_3fr_2fr] items-center min-w-0 w-full ">
          <span className="text-sm font-bold">
            {filteredStocks?.[index]?.code}
          </span>
          <span className="text-sm uppercase">
            {currentLang === "vi"
              ? filteredStocks?.[index]?.clientName
              : (filteredStocks?.[index]?.clientNameEn ??
                filteredStocks?.[index]?.clientName)}
          </span>
          <span className="flex flex-row items-center text-xs text-content-tertiary ml-auto">
            {t(TYPE_LABEL[filteredStocks?.[index]?.type ?? ""] ?? "")} -{" "}
            {filteredStocks?.[index]?.type === "i"
              ? "upcom"
              : filteredStocks?.[index]?.exchange}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-normal mb-2" htmlFor={name}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
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
              className="absolute top-[calc(100%+6px)] left-0 bg-bg-tertiary border border-outline-base rounded-md shadow-xl z-50 overflow-hidden md:w-110 w-80"
            >
              {filteredStocks.length === 0 ? (
                <div className="grid place-items-center h-13 px-4 text-center text-content-tertiary text-sm">
                  {t("banks-not-found")}
                </div>
              ) : (
                <List
                  id={`${name}-stock-list`}
                  listRef={listRef}
                  className="max-h-50! overflow-auto!"
                  rowComponent={RowComponent}
                  rowCount={filteredStocks.length}
                  rowProps={{
                    filteredStocks,
                    currentLang,
                    onSelect: handleStockSelect,
                    selectedStock,
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
