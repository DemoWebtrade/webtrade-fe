export default function SekeletonChartIndex() {
  return (
    <div className="w-full h-full flex flex-row gap-1">
      <div className="h-full flex flex-col bg-bg-secondary rounded-md pb-1 md:w-1/3">
        <div className="flex flex-row items-center justify-between px-2 py-2 md:px-1 md:pt-1 ">
          <div className="flex flex-col items-start w-1/5 p-1">
            <div className="flex flex-row gap-2 md:gap-4 h-10 w-full animate-pulse bg-primary-active rounded-md"></div>
          </div>
          <div className="flex flex-col gap-1 items-end w-2/5 h-10 p-1">
            <div className="w-full h-1/2 bg-primary-active rounded-md animate-pulse"></div>
            <div className="w-full h-1/2 bg-primary-active rounded-md animate-pulse"></div>
          </div>
        </div>
        <div className="flex-1 bg-primary-active rounded-md animate-pulse mx-2 mb-1"></div>
      </div>
    </div>
  );
}
