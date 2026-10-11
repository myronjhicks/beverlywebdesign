import { BEFORE_AFTER } from "@/lib/site";

/** Ruled Before / After rows. `dark` is for the ink band. */
export function BeforeAfter({ dark = false }: { dark?: boolean }) {
  const rule = dark ? "border-paper/25" : "border-line";
  const beforeText = dark ? "text-paper/75" : "text-mute";
  const afterText = dark ? "text-paper" : "text-ink";
  const afterLabel = dark ? "text-glow" : "text-accent-deep";
  const beforeLabel = dark ? "text-paper/75" : "text-mute";

  return (
    <ul className={`border-b ${rule}`}>
      {BEFORE_AFTER.map((row) => (
        <li key={row.before} className={`border-t ${rule} py-6`}>
          <div className="grid gap-x-6 gap-y-1 sm:grid-cols-[72px_1fr]">
            <p className={`text-[14px] font-semibold sm:pt-1 ${beforeLabel}`}>Before</p>
            <p className={`text-[16px] ${beforeText}`}>{row.before}</p>
          </div>
          <div className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-[72px_1fr]">
            <p className={`text-[14px] font-semibold sm:pt-1 ${afterLabel}`}>After</p>
            <p className={`text-[18px] font-medium leading-snug ${afterText}`}>{row.after}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
