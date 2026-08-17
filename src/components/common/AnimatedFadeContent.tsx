import { motion, type HTMLMotionProps } from "framer-motion";
import { Suspense, type ReactNode } from "react";
import SprinnerLoader from "../features/skeletons/SprinnerLoader";

interface AnimatedFadeContentProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  transition?: HTMLMotionProps<"div">["transition"];
  initial?: HTMLMotionProps<"div">["initial"];
  animate?: HTMLMotionProps<"div">["animate"];
  exit?: HTMLMotionProps<"div">["exit"];
}

const AnimatedFadeContent = ({
  children,
  className = "w-full h-full",
  fallback = <SprinnerLoader />,
  transition = { duration: 0.35, ease: "easeInOut" },
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  exit = { opacity: 0 },
}: AnimatedFadeContentProps) => {
  return (
    <Suspense fallback={fallback}>
      <motion.div
        className={className}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        {children}
      </motion.div>
    </Suspense>
  );
};

export default AnimatedFadeContent;
