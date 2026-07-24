import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Order() {
  const [tabActive] = useState<string>("BASE");

  const { handleSubmit } = useForm();

  const onSubmit = () => {};

  return (
    <div className="md:w-md w-full h-full bg-bg-secondary absolute right-0 top-0 z-1">
      <div className="w-full flex flex-row items-center justify-between border-b border-border">
        <div className="flex flex-row">
          <span
            className={`px-4 py-1 text-sm text-center ${tabActive === "BASE" ? "border-b-2 border-purple-active font-medium" : ""}`}
          >
            Giao dịch cơ sở
          </span>
        </div>

        <div className="text-content-primary">
          <X className="size-4 md:size-5" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      ></form>
    </div>
  );
}
