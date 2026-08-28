import { MENU_ITEMS } from "@/configs";
import { useClickOutside } from "@/hooks/useClickOutside"; // chỉnh lại path cho đúng
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectToken } from "@/store/modules/auth/selector";
import { setIsLogin } from "@/store/modules/auth/slice";
import { selectOpenMenu, selectTabMenu } from "@/store/modules/common/selector";
import { setIsOpenMenu, setTabMenu } from "@/store/modules/common/slice";
import { AnimatePresence, motion } from "framer-motion";
import { SquareChevronRight, type LucideProps } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import packageJson from "../../../../package.json";
import DayTrading from "../header/component/DayTrading";

type MenuItem = {
  key: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  link: string;
};

export default function Menu() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const tabActive = useAppSelector(selectTabMenu);
  const isOpenMenu = useAppSelector(selectOpenMenu);

  const menuRef = useRef<HTMLDivElement>(null);

  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (MENU_ITEMS.some((item) => item.link === path)) {
      dispatch(setTabMenu(MENU_ITEMS.find((item) => item.link === path)?.key));
    }
  }, [dispatch, path]);

  const onClickChangeTab = useCallback(
    (tabInfor: MenuItem) => {
      if (!token) {
        dispatch(setIsLogin(true));
        return;
      }

      dispatch(setTabMenu(tabInfor.key));
      navigate(tabInfor.link);
    },
    [token, dispatch, navigate],
  );

  useClickOutside(menuRef, () => dispatch(setIsOpenMenu(false)));

  return (
    <div
      ref={menuRef}
      className="absolute top-0 left-0 z-10 h-full"
      onMouseEnter={() => dispatch(setIsOpenMenu(true))}
    >
      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative z-10 h-full md:w-56 w-46 bg-bg-secondary shadow-[10px_0px_15px_-3px_rgba(0,0,0,1)] flex flex-col pb-3"
          >
            <div className="py-3">
              <DayTrading />
            </div>

            <div className="px-4 pb-2 text-xs font-medium text-content-tertiary uppercase tracking-wide">
              {t("menu.title")}
            </div>

            <nav className="flex flex-col gap-0.5 px-2">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = tabActive === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => onClickChangeTab(item)}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                      isActive
                        ? "bg-purple-active/10 text-purple-active font-medium"
                        : "text-content-secondary hover:bg-bg-primary hover:text-content-primary"
                    }`}
                  >
                    <Icon
                      className={`size-4 shrink-0 transition-colors duration-150 ${
                        isActive
                          ? "text-purple-active"
                          : "text-content-tertiary group-hover:text-content-primary"
                      }`}
                    />
                    <span>{t(item.label)}</span>

                    {isActive && (
                      <motion.span
                        layoutId="menu-active-dot"
                        className="ml-auto size-1.5 rounded-full bg-purple-active"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Version */}
            <div className="text-xs text-content-tertiary absolute bottom-1 left-1/2 -translate-x-1/2">
              v{packageJson.version}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`cursor-pointer bg-secondary-base border border-border rounded-full p-1.5 absolute top-2 z-20 transition-[left] duration-300 ease-in-out ${
          isOpenMenu ? "md:left-52 left-42 rotate-180" : "left-0"
        }`}
        data-tooltip-id="global-tooltip"
        data-tooltip-place="right"
        data-tooltip-content={t("Menu")}
        onClick={() => dispatch(setIsOpenMenu(!isOpenMenu))}
        data-tour="prop-1"
      >
        <SquareChevronRight className="size-3.5 text-content-tertiary" />
      </div>
    </div>
  );
}
