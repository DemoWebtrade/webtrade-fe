import { ClipLoader } from "react-spinners";

export default function SprinnerLoader({ size }: { size?: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ClipLoader color="#9333ea" size={size} />
    </div>
  );
}
