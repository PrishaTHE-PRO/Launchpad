import { TopHeader } from "@/components/top-header";
import { RightSidebar } from "@/components/right-sidebar";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto px-12 pb-12 custom-scroll">
          {children}
        </main>
      </div>
      <RightSidebar />
    </>
  );
}
