import HistoryComponent from "@/components/HistoryComponent";

export default function Page() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-semibold">History</h1>

        <HistoryComponent />
      </div>
    </>
  );
}
