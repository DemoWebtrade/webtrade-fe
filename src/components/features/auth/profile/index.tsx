import { motion } from "framer-motion";

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute top-12 md:top-10 -right-0.5 md:-right-2 z-10 bg-bg-tertiary shadow-md px-4 py-3 rounded-md md:w-160 sm:w-120 w-[calc(100svw)] h-[calc(100svh-50px)]"
    ></motion.div>
  );
}
