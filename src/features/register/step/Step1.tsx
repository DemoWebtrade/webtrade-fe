export default function Step1({ nextStep }: { nextStep: () => void }) {
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <div onClick={nextStep}></div>
    </div>
  );
}
