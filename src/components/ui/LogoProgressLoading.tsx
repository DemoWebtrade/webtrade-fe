import Logo from "@/assets/imgs/logo/lhc_logo.png";

export default function LogoBarLoading() {
  return (
    <div className="flex flex-col gap-1 items-center justify-center h-screen bg-[#0f1115]">
      <div className="flex flex-row items-center justify-center gap-2 ">
        <img src={Logo} alt="logo-website" className="h-10 w-12" />
        <div className="text-loader text-xl">
          <span>LHC TRADING</span>
          <span className="shimmer">LHC TRADING</span>
        </div>
      </div>
      <div className="progess-loader ml-4 mt-2"></div>
    </div>
  );
}
