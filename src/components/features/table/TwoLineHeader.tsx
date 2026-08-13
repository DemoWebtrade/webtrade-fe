export default function TwoLineHeader(props: { line1: string; line2: string }) {
  return (
    <div className="flex flex-col w-full">
      <span>{props.line1}</span>
      <span>{props.line2}</span>
    </div>
  );
}
