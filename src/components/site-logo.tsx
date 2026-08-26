type Props = {
  className?: string;
  /** "blue" = modré na světlém podkladu, "white" = bílé na modrém */
  tone?: "blue" | "white";
  withTagline?: boolean;
};

/**
 * Logo „JEDNÍM HLASEM“ — bublinový rám se dvěma ocásky.
 */
export function SiteLogo({ className, tone = "blue", withTagline = true }: Props) {
  const main = tone === "white" ? "text-primary-foreground" : "text-primary";
  const border = tone === "white" ? "border-primary-foreground" : "border-primary";
  const fill = tone === "white" ? "fill-primary-foreground" : "fill-primary";

  return (
    <span className={`inline-flex flex-col ${main} ${className ?? ""}`}>
      <span className={`relative border-[3px] ${border} px-3 pb-2.5 pt-2 md:px-4 md:pb-3 md:pt-2.5`}>
        {/* horní ocásek vlevo */}
        <svg
          viewBox="0 0 24 14"
          aria-hidden
          className={`absolute -top-[14px] left-3 h-[14px] w-6 ${fill} md:left-4`}
        >
          <path d="M0 14V0l24 14H0Z" />
        </svg>
        {/* spodní ocásek vpravo */}
        <svg
          viewBox="0 0 24 14"
          aria-hidden
          className={`absolute -bottom-[14px] right-3 h-[14px] w-6 ${fill} md:right-4`}
        >
          <path d="M24 0v14L0 0h24Z" />
        </svg>

        <span className="block font-display text-xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] md:text-[1.75rem]">
          Jedním
          <br />
          Hlasem
        </span>
      </span>

      {withTagline ? (
        <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.16em] opacity-80 md:text-[10px]">
          Fakty proti dezinformacím
        </span>
      ) : null}
    </span>
  );
}
