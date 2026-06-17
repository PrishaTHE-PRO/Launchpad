import { Icon } from "@iconify/react";
import { IpoNewsCard, IpoSetupPrompt } from "@/components/ipo-news-card";
import { getIpoNews } from "@/lib/nyt-api";

export const dynamic = "force-dynamic";

export default async function IpoNewsPage() {
  const hasKey = Boolean(process.env.NYT_API_KEY);

  if (!hasKey) {
    return (
      <>
        <section className="mt-8 mb-12">
          <h1 className="text-[64px] font-serif-warm tracking-tight leading-[1.05] text-[var(--text-dark)] mb-6">
            IPO <span className="italic text-[#FF7A3D]">Radar.</span>
          </h1>
        </section>
        <IpoSetupPrompt />
      </>
    );
  }

  let articles: Awaited<ReturnType<typeof getIpoNews>> = [];
  let error: string | null = null;

  try {
    articles = await getIpoNews(12);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load IPO news";
  }

  if (error) {
    return (
      <>
        <section className="mt-8 mb-12">
          <h1 className="text-[64px] font-serif-warm tracking-tight leading-[1.05] text-[var(--text-dark)] mb-6">
            IPO <span className="italic text-[#FF7A3D]">Radar.</span>
          </h1>
          <div className="card-human p-8 border-red-200">
            <p className="text-[15px] font-bold text-red-600 mb-2">NYT API error</p>
            <p className="text-[14px] text-[var(--text-muted)]">{error}</p>
          </div>
        </section>
      </>
    );
  }

  const statusCounts = articles.reduce(
    (acc, a) => {
      acc[a.status] = (acc[a.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      <section className="mt-8 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full badge-warm text-[11px] font-black uppercase tracking-wider">
            Live from NYT
          </span>
          <span className="text-[12px] font-bold text-[var(--text-muted)]">
            Article Search API
          </span>
        </div>
        <h1 className="text-[64px] font-serif-warm tracking-tight leading-[1.05] text-[var(--text-dark)] mb-6">
          IPO <span className="italic text-[#FF7A3D]">Radar.</span>
        </h1>
        <p className="text-[var(--text-muted)] text-[18px] font-medium max-w-2xl mb-4">
          Real headlines about IPOs, going public, and market debuts from The New York Times.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <span
              key={status}
              className="px-4 py-2 rounded-xl border-2 border-[var(--border-heavy)] bg-[var(--card-white)] text-[12px] font-bold text-[var(--text-dark)] capitalize"
            >
              {status} · {count}
            </span>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {articles.map((item) => (
          <IpoNewsCard key={item.id} item={item} />
        ))}
      </section>

      {articles.length === 0 && (
        <div className="card-human p-12 text-center mt-8">
          <Icon icon="ph:newspaper-duotone" className="text-[64px] text-[#D4A574] mb-4 mx-auto" />
          <p className="text-[15px] text-[var(--text-muted)]">No IPO articles found right now.</p>
        </div>
      )}
    </>
  );
}
