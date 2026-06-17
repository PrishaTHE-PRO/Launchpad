import { Icon } from "@iconify/react";
import type { IpoNewsItem } from "@/lib/types";

const STATUS_CONFIG = {
  filed: { label: "Filed", color: "bg-blue-100 text-blue-700 border-blue-200" },
  priced: { label: "Priced", color: "bg-violet-100 text-violet-700 border-violet-200" },
  trading: { label: "Trading", color: "bg-green-100 text-green-700 border-green-200" },
  rumored: { label: "Rumored", color: "bg-amber-100 text-amber-700 border-amber-200" },
  news: { label: "News", color: "bg-gray-100 text-gray-700 border-gray-200" },
} as const;

export function IpoNewsCard({ item }: { item: IpoNewsItem }) {
  const status = STATUS_CONFIG[item.status];

  return (
    <article className="card-human p-8 flex flex-col h-full relative overflow-hidden group">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--card-white)] border-2 border-[var(--border-heavy)] p-2.5 flex items-center justify-center shadow-[3px_3px_0px_var(--shadow-hard)]">
            <Icon icon="ph:trend-up-duotone" className="text-2xl text-[#FF7A3D]" />
          </div>
          <div>
            <h3 className="text-lg font-serif-warm text-[var(--text-dark)]">{item.company}</h3>
            <span className="text-[11px] font-bold text-[#B0A8A0] uppercase tracking-wider">
              {item.sector} · {item.source}
            </span>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${status.color}`}
        >
          {status.label}
        </span>
      </div>

      <h4 className="text-[16px] font-bold text-[var(--text-dark)] leading-snug mb-3">
        {item.headline}
      </h4>
      <p className="text-[14px] text-[var(--text-muted)] leading-relaxed mb-6 flex-1">
        {item.summary}
      </p>

      <div className="flex items-center justify-between border-t-2 border-[var(--sidebar-bg)] pt-5 mt-auto">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] font-bold text-[#FF7A3D] hover:underline flex items-center gap-1"
        >
          Read on NYT
          <Icon icon="ph:arrow-square-out-duotone" />
        </a>
        <span className="text-[11px] font-bold text-[#B0A8A0] uppercase">{item.date}</span>
      </div>
    </article>
  );
}

export function IpoSetupPrompt() {
  return (
    <div className="card-human p-12 max-w-2xl">
      <Icon icon="ph:key-duotone" className="text-[64px] text-[#FF7A3D] mb-6" />
      <h2 className="text-2xl font-serif-warm text-[var(--text-dark)] mb-4">
        Connect your NYT API key
      </h2>
      <p className="text-[15px] text-[var(--text-muted)] mb-6 leading-relaxed">
        IPO news is pulled live from the{" "}
        <a
          href="https://developer.nytimes.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF7A3D] font-bold hover:underline"
        >
          New York Times Article Search API
        </a>
        . No mock articles — real headlines about IPOs, going public, and market debuts.
      </p>
      <ol className="space-y-3 text-[14px] text-[var(--text-dark)] mb-8 list-decimal list-inside">
        <li>
          Go to{" "}
          <a href="https://developer.nytimes.com/" className="text-[#FF7A3D] font-bold">
            developer.nytimes.com
          </a>{" "}
          and create an app
        </li>
        <li>Enable the <strong>Article Search API</strong></li>
        <li>
          Copy your key into <code className="bg-[var(--sidebar-bg)] px-2 py-0.5 rounded">.env.local</code>:
        </li>
      </ol>
      <pre className="bg-[var(--sidebar-bg)] border-2 border-[var(--border-heavy)] rounded-2xl p-4 text-[13px] font-mono overflow-x-auto">
        NYT_API_KEY=your_key_here
      </pre>
      <p className="text-[12px] text-[var(--text-muted)] mt-4 italic">
        Restart the dev server after adding the key.
      </p>
    </div>
  );
}
