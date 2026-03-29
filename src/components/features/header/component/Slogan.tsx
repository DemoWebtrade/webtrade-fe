import Marquee from "react-fast-marquee";

const email = import.meta.env.VITE_EMAIL_URL || "lhc021120@gmail.com";

export default function Slogan() {
  return (
    <div className="bg-purple-base/10 h-6 flex items-center justify-center rounded overflow-hidden">
      <Marquee
        speed={50}
        pauseOnHover={true}
        className="text-xs font-medium"
        gradient={false}
      >
        <span className="mx-8">
          Dự án WebTrade cá nhân của LHC - hiện đang phát triển và sẽ sớm được
          nâng cấp với phiên bản hoàn thiện hơn.
        </span>

        <span className="mx-8">
          Nếu muốn góp ý hoặc liên hệ thì liên hệ qua Gmail này:
          <a
            href={`mailto:${email}`}
            className="underline hover:text-purple-600 transition-colors ml-1"
          ></a>
        </span>

        <span className="mx-8">
          Dự án WebTrade cá nhân của LHC - hiện đang phát triển và sẽ sớm được
          nâng cấp với phiên bản hoàn thiện hơn.
        </span>

        <span className="mx-8">
          Nếu muốn góp ý hoặc liên hệ thì liên hệ qua Gmail này:
          <a
            href={`mailto:${email}`}
            className="underline hover:text-purple-600 transition-colors ml-1"
          >
            {email}
          </a>
        </span>
      </Marquee>
    </div>
  );
}
