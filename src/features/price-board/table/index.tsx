import { lazy, Suspense } from "react";

const BaseTable = lazy(() => import("./BaseTable"));

export default function Table() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Suspense
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="progess-loader"></div>
          </div>
        }
      >
        <BaseTable />
      </Suspense>
    </div>
  );
}
