import Logo from "@/assets/imgs/logo/lhc_logo.png";
import ClientSetting from "@/components/features/header/component/ClientSetting";
import { Link } from "react-router-dom";

export default function RegisterHeader() {
  return (
    <header className="flex items-center justify-between w-full h-full bg-bg-secondary md:px-4 px-2 pr-0.5 gap-1 md:gap-8">
      <Link className="flex flex-row items-center gap-1 md:gap-2" to="/">
        <img src={Logo} alt="logo" className="w-10 min-w-8 h-full" />

        <div className="flex flex-row items-center gap-1 md:gap-2">
          <span className="text-base font-bold">WebTrade</span>
          <div className="text-[8px] font-bold px-1 rounded bg-purple-selected text-white grid place-items-center h-max">
            PRO
          </div>
        </div>
      </Link>

      <ClientSetting />
    </header>
  );
}
