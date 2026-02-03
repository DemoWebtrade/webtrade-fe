import BodyTable from "./BodyTable";
import HeaderTable from "./HeaderTable";

export default function Table() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <HeaderTable />
      <BodyTable />
    </div>
  );
}
