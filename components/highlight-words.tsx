
type HighlightWordsProps = {
  text: string
  highlights: string[]
  className?: string
  highlightClassName?: string
}

export function HighlightWords({
  text,
  highlights,
  className,
  highlightClassName = "group-hover:text-sky-700 dark:group-hover:text-sky-400",
}: HighlightWordsProps) {
  return (
    <p className={"group cursor-pointer leading-relaxed " + (className ?? "")}>
      {text.split(" ").map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9-]/g, "")
        const isHighlight = highlights.includes(cleanWord)

        return (
          <span
            key={i}
            className={
              isHighlight
                ? "m-sub font-semibold transition-all duration-200 " + highlightClassName
                : "m-sub "
            }
          >
            {word + " "}
          </span>
        )
      })}
    </p>
  )
}
