import { TopHeader } from "@/components/top-header";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopHeader />
      <main className="flex-1 overflow-y-auto px-12 pb-24 custom-scroll">
        {children}
      </main>
    </div>
  );
}
