import Link from "next/link";
import { Icon } from "@iconify/react";
import { getIpoNews, getBusinessNews } from "@/lib/nyt-api";

export async function RightSidebar() {
  let ipoHeadlines: Awaited<ReturnType<typeof getIpoNews>> = [];
  let hasNyt = Boolean(process.env.NYT_API_KEY);

  if (hasNyt) {
    try {
      ipoHeadlines = await getIpoNews(3);
    } catch {
      try {
        ipoHeadlines = await getBusinessNews(3);
      } catch {
        hasNyt = false;
      }
    }
  }

  return (
    <aside className="w-[360px] flex-shrink-0 flex flex-col bg-[var(--sidebar-bg)] border-l border-[var(--border-color)] z-40">
      <div className="p-10 flex-shrink-0">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#B0A8A0] mb-6 flex items-center gap-2">
          <Icon icon="ph:newspaper-duotone" />
          {hasNyt ? "IPO headlines" : "Market news"}
        </h3>

        {hasNyt && ipoHeadlines.length > 0 ? (
          <>
            <div className="space-y-4 mb-8">
              {ipoHeadlines.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 bg-[var(--card-white)] border-2 border-[var(--border-color)] rounded-[20px] hover:border-[#FF7A3D]/40 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="ph:trend-up-duotone" className="text-lg text-[#FF7A3D]" />
                    <span className="text-[12px] font-bold text-[var(--text-dark)]">{item.company}</span>
                    <span className="text-[10px] font-black uppercase text-[#B0A8A0] ml-auto">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[13px] font-medium text-[var(--text-muted)] leading-snug line-clamp-2 group-hover:text-[var(--text-dark)]">
                    {item.headline}
                  </p>
                </a>
              ))}
            </div>
            <Link
              href="/draft/star-charts"
              className="text-[12px] font-bold text-[#FF7A3D] hover:underline flex items-center gap-1"
            >
              View all IPO news
              <Icon icon="ph:arrow-right-bold" />
            </Link>
          </>
        ) : (
          <div className="p-5 bg-[var(--card-white)] border-2 border-dashed border-[var(--border-heavy)] rounded-[20px] mb-6">
            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
              Add <code className="text-[12px] bg-[var(--sidebar-bg)] px-1 rounded">NYT_API_KEY</code> to{" "}
              <code className="text-[12px] bg-[var(--sidebar-bg)] px-1 rounded">.env.local</code> for live IPO
              headlines from The New York Times.
            </p>
          </div>
        )}
      </div>

      <div className="flex-1 px-10 border-t-2 border-dashed border-[var(--border-color)] py-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B0A8A0]">
            Career snapshot
          </h3>
          <Link href="/draft/career-planner">
            <Icon
              icon="ph:compass-duotone"
              className="text-[#B0A8A0] hover:text-[#FF7A3D] cursor-pointer transition-all text-xl"
            />
          </Link>
        </div>

        <div className="p-5 rounded-[24px] bg-[var(--card-white)] border-2 border-[var(--border-heavy)] shadow-[4px_4px_0px_var(--shadow-hard)]">
          <p className="text-[11px] font-black text-[#B0A8A0] uppercase tracking-widest mb-2">
            Data sources
          </p>
          <ul className="space-y-2 text-[13px] text-[var(--text-dark)]">
            <li className="flex items-center gap-2">
              <Icon icon="ph:check-circle-duotone" className="text-emerald-500" />
              YC companies (live)
            </li>
            <li className="flex items-center gap-2">
              <Icon icon="ph:check-circle-duotone" className="text-emerald-500" />
              Greenhouse / Lever jobs
            </li>
            <li className="flex items-center gap-2">
              <Icon icon={hasNyt ? "ph:check-circle-duotone" : "ph:circle-duotone"} className={hasNyt ? "text-emerald-500" : "text-[#B0A8A0]"} />
              NYT IPO news
            </li>
          </ul>
          <Link
            href="/draft/career-planner"
            className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold text-[#FF7A3D]"
          >
            Open Career Planner
            <Icon icon="ph:arrow-right-bold" />
          </Link>
        </div>
      </div>

      <div className="p-8 bg-[var(--card-white)] border-t border-[var(--border-color)]">
        <p className="text-[9px] font-black text-[#B0A8A0] uppercase tracking-widest mb-1">
          Powered by
        </p>
        <p className="text-[12px] font-bold text-[var(--text-dark)]">
          YC API · Greenhouse · Lever · NYT
        </p>
      </div>
    </aside>
  );
}
