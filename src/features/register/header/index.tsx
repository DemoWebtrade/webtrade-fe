import Logo from "@/assets/imgs/logo/lhc_logo.png";
import ClientSetting from "@/components/features/header/component/ClientSetting";
import { useNavigate } from "react-router-dom";

export default function RegisterHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between w-full h-full bg-bg-secondary md:px-2 pr-0.5 border-b border-border md:gap-8 gap-4 max-[425px]:gap-0">
      <div
        className="flex flex-row items-center md:gap-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="logo" className="w-12 h-full" />
      </div>

      <ClientSetting />
    </header>
  );
}
