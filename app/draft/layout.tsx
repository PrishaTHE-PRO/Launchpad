import { Sidebar } from "@/components/sidebar";

export default function DraftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed inset-0 grain-texture z-[-1]" />
      <div className="flex h-screen overflow-hidden relative">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
