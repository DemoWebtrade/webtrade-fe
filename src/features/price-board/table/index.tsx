import ProgessLoader from "@/components/features/skeletons/ProgessLoader";
import { lazy, Suspense } from "react";

const BaseTable = lazy(() => import("./BaseTable"));

export default function Table({ id }: { id: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Suspense fallback={<ProgessLoader />}>
        <BaseTable id={id} />
      </Suspense>
    </div>
  );
}
