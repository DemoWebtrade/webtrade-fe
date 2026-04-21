import Logo from "@/assets/imgs/logo/lhc_logo.png";
import { Button } from "@/components/ui/Button";
import { backdropVariants, modalVariants } from "@/configs/modal";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useJoyride } from "react-joyride";
import Typewriter from "typewriter-effect";
const steps = [
  {
    target: '[data-tour="prop-1"]',
    title: "Lịch giao dịch",
    content:
      "Xem lịch hoạt động của thị trường, bao gồm ngày nghỉ, ngày đóng cửa và thời gian giao dịch.",
  },
  {
    target: '[data-tour="prop-2"]',
    title: "Thông báo",
    content:
      "Theo dõi các thông báo mới nhất từ thị trường và hệ thống theo thời gian thực.",
  },
  {
    target: '[data-tour="prop-3"]',
    title: "Cài đặt hệ thống",
    content:
      "Tùy chỉnh ngôn ngữ, giao diện và các thiết lập cá nhân theo nhu cầu sử dụng.",
  },
  {
    target: '[data-tour="prop-4"]',
    title: "Toàn màn hình",
    content:
      "Chuyển sang chế độ toàn màn hình để tối ưu không gian hiển thị khi giao dịch.",
  },
  // {
  //   target: '[data-tour="prop-5"]',
  //   title: "Danh mục yêu thích",
  //   content:
  //     "Quản lý danh mục theo dõi: thêm, chỉnh sửa hoặc xóa các mã chứng khoán quan tâm.",
  // },
  {
    target: '[data-tour="prop-6"]',
    title: "Chọn sàn giao dịch",
    content:
      "Lọc và hiển thị danh sách mã chứng khoán theo từng sàn trên bảng giá.",
  },
  {
    target: '[data-tour="prop-7"]',
    title: "Tự động cuộn bảng giá",
    content: "Tự động cuộn bảng giá từ trên xuống dưới để theo dõi liên tục.",
  },
  {
    target: '[data-tour="prop-8"]',
    title: "Xuất Excel",
    content:
      "Xuất dữ liệu hiện tại của bảng giá ra file Excel để lưu trữ hoặc phân tích.",
  },
  {
    target: '[data-tour="prop-9"]',
    title: "Đặt lệnh",
    content: "Mở nhanh cửa sổ đặt lệnh để thực hiện mua/bán chứng khoán.",
  },
  {
    target: '[data-tour="prop-10"]',
    title: "Đăng nhập",
    content:
      "Xác thực tài khoản để truy cập toàn bộ chức năng giao dịch và quản lý dữ liệu cá nhân.",
  },
];

interface MainJoyrideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MainJoyride({ isOpen, onClose }: MainJoyrideProps) {
  const [run, setRun] = useState(false);

  const [showButton, setShowButton] = useState(false);
  const { controls, on, Tour } = useJoyride({
    continuous: true,
    debug: true,
    onEvent: (data) => {
      if (data.type === "tour:end" || data.type === "tour:status") {
        if (data.status === "finished" || data.status === "skipped") {
          setRun(false);

          // lưu trạng thái đã xem
          localStorage.setItem("hasSeenTour", "true");
        }
      }
    },
    steps,
    run,

    options: {
      buttons: ["back", "close", "primary", "skip"],
      scrollOffset: 64,
      showProgress: true,
      skipScroll: true,
      spotlightPadding: 16,
      spotlightRadius: 16,
    },
    styles: {
      tooltip: {
        backgroundColor: "var(--color-bg-tertiary)",
        color: "var(--color-content-primary)",
        fontSize: "clamp(12px, 1vw, 14px)",
      },
      tooltipTitle: {
        fontSize: "clamp(14px, 1.2vw, 16px)",
      },
      tooltipContent: {
        fontSize: "clamp(12px, 1vw, 14px)",
      },
      arrow: {
        color: "var(--color-bg-tertiary)",
      },

      buttonPrimary: {
        backgroundColor: "var(--color-bg-button)",
        fontSize: "clamp(10px, 0.8vw, 12px)",
        color: "var(--color-content-primary)",
      },
      buttonBack: {
        fontSize: "clamp(10px, 0.8vw, 12px)",
        color: "var(--color-content-disable)",
      },
      buttonClose: {
        fontSize: "clamp(10px, 0.8vw, 12px)",
        color: "var(--color-content-primary)",
      },
      buttonSkip: {
        fontSize: "clamp(10px, 0.8vw, 12px)",
        color: "var(--color-content-primary)",
      },
      floater: {
        display: "inline-block",
        filter: "drop-shadow(0 0 3px #592d69)",
        maxWidth: "100%",
        transition: "opacity 0.3s",
      },
      beaconInner: {
        backgroundColor: "var(--color-purple-base)",
      },
      beaconOuter: {
        border: `2px solid var(--color-purple-base)`,
      },
    },
  });

  useEffect(() => {
    on("tour:end", () => {
      controls.reset();
      setRun(false);
    });
  }, [controls, on]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-5 pb-6 max-w-[90%] w-full md:w-140 rounded-lg shadow-2xl overflow-hidden border border-border bg-bg-primary"
            >
              {/* header */}
              <div className="p-2 flex flex-row gap-2 items-center">
                <img src={Logo} alt="logo-website" className="h-9 w-10" />
                <h1 className="md:text-lg text-base font-semibold">
                  Chào mừng nhà đầu tư đến với LHC TRADING
                </h1>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 text-center px-6">
                {/* Description */}
                <div
                  className={`md:text-sm text-xs text-left overflow-hidden transition-all duration-500 ease-in-out`}
                >
                  <Typewriter
                    onInit={(tw) => {
                      tw.typeString(
                        `
                          <span class="font-semibold text-base">
                            LHC Web Trade
                          </span> - Nền tảng giao dịch mô phỏng được thiết kế với tiêu chí 
                          <span class="font-medium">hiệu năng cao, dữ liệu realtime và trải nghiệm trực quan.</span>
                        `,
                      ).pauseFor(600);
                      tw.typeString(
                        `
                          <br/><br/>

                          <ul class="list-disc text-left pl-10 space-y-1">
                            <li>Giám sát thị trường theo thời gian thực với bảng giá động.</li>
                            <li>Thực hiện đặt lệnh nhanh chóng và quản lý danh mục hiệu quả.</li>
                            <li>Lọc dữ liệu theo sàn giao dịch và theo dõi liên tục.</li>
                            <li>Tùy chỉnh giao diện, tối ưu trải nghiệm người dùng.</li>
                            <li>Hỗ trợ xuất dữ liệu phục vụ phân tích và đánh giá.</li>
                          </ul>
                        `,
                      ).pauseFor(600);
                      tw.typeString(
                        `
                          <br/>

                          <span class="font-medium">Kiến trúc hệ thống:</span><br/>
                          <span class="pl-6">
                            Frontend được xây dựng với React và TypeScript, áp dụng kiến trúc module hóa, 
                            kết hợp Redux Toolkit và Saga để quản lý state bất đồng bộ.
                          </span><br/>
                          <span class="pl-6">
                            Hệ thống sử dụng WebSocket để xử lý dữ liệu realtime, mô phỏng luồng giao dịch 
                            với độ trễ thấp và khả năng cập nhật liên tục.
                          </span>
                        `,
                      ).pauseFor(600);
                      tw.typeString(
                        `
                          <br/><br/>

                          <span class="text-red-500 font-semibold pl-6">
                            Lưu ý: Đây là hệ thống mô phỏng. Toàn bộ dữ liệu chỉ mang tính chất tham khảo 
                            và không phản ánh thị trường thực tế.
                          </span>
                        `,
                      ).pauseFor(600);
                      tw.typeString(
                        `
                          <br/><br/>

                          <span class="font-medium">
                            Sẵn sàng bắt đầu trải nghiệm?
                          </span>
                        `,
                      )
                        .pauseFor(600)

                        .callFunction(() => {
                          setShowButton(true);
                        })

                        .start();
                    }}
                    options={{
                      delay: 18,
                      deleteSpeed: 8,
                      cursor: "",
                    }}
                  />
                </div>
              </div>{" "}
              {showButton && (
                <div className="flex flex-row-reverse gap-2 items-center px-6 pt-6">
                  <Button
                    variant="default"
                    onClick={() => {
                      setRun(true);
                      onClose();
                    }}
                  >
                    Khám phá
                  </Button>
                  <Button variant="none" onClick={() => onClose()}>
                    Thoát
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
      {Tour}
    </AnimatePresence>
  );
}
