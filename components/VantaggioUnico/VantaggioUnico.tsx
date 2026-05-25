interface VantaggioUnicoProps {
  titleOne?: string
  highlightOne?: string
  titleTwo?: string
  highlightTwo?: string
  titleThree?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
}

export default function VantaggioUnico({
  titleOne,
  highlightOne,
  titleTwo,
  highlightTwo,
  titleThree,
  subtitle,
  ctaText,
  ctaHref,
}: VantaggioUnicoProps) {
  const hasTitle = titleOne || highlightOne || titleTwo || highlightTwo || titleThree
  if (!hasTitle) return null

  const ctaLink = ctaHref || "/contatti"

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-black leading-[1.2] tracking-tight text-slate-950 dark:text-white md:text-[42px] mb-6">
          {titleOne && <>{titleOne}{" "}</>}
          {highlightOne && (
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              {highlightOne}
            </span>
          )}
          {highlightOne && titleTwo && <>{" "}</>}
          {titleTwo && <>{titleTwo}{" "}</>}
          {highlightTwo && (
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              {highlightTwo}
            </span>
          )}
          {highlightTwo && titleThree && <>{" "}</>}
          {titleThree && <>{titleThree}</>}
        </h2>

        {subtitle && (
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {ctaText && (
          <a href={ctaLink} style={{ color: "#ffffff" }} className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-10 py-4 font-bold shadow-xl">
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}