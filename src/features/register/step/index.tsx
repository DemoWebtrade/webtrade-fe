import { useState } from "react";
import Step1 from "./Step1";

export default function RegisterStep() {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-xl font-bold py-2 md:py-4">Khởi tạo tài khoản</h1>
      <div>Các bước</div>

      {step === 1 && <Step1 nextStep={() => setStep(2)} />}
    </div>
  );
}
