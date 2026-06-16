import Image from "next/image"
import { urlFor } from "../../sanity/lib/image"

interface BenefitItem {
  image?: { asset: { _ref: string } }
  title: string
  description: string
}

interface BenefitsSectionProps {
  titleHighlight?: string
  titleNormal?: string
  items?: BenefitItem[]
  ctaText?: string
  ctaHref?: string
}

export default function BenefitsSection({ titleHighlight, titleNormal, items, ctaText, ctaHref }: BenefitsSectionProps) {
  if (!items?.length) return null
  const link = ctaHref || "/contatti"

  return (
    <section className="benefits-section py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {(titleHighlight || titleNormal) && (
          <div className="text-center mb-16 max-w-lg mx-auto">
            <h2 className="benefits-title text-4xl font-black leading-[1.2] tracking-tight md:text-[42px]">
              {titleHighlight && <span className="bg-brand-gradient bg-clip-text text-transparent">{titleHighlight}</span>}
              {titleHighlight && titleNormal && " "}
              {titleNormal}
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="benefit-card rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2">
              {item.image && (
                <div className="mb-6">
                  <Image src={urlFor(item.image).width(1080).height(1080).url()} alt={item.title} width={64} height={64} className="object-contain" />
                </div>
              )}
              <h3 className="benefit-card-title text-lg font-bold mb-3">{item.title}</h3>
              <p className="benefit-card-text text-base leading-7">{item.description}</p>
            </div>
          ))}
        </div>
        {ctaText && (
          <div className="mt-16 flex justify-center">
            <a href={link} style={{ color: "#ffffff", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to right, #fc03b0, #047cf9)", padding: "16px 40px", borderRadius: "999px", fontWeight: 700, fontSize: "16px", textDecoration: "none", boxShadow: "0 8px 32px rgba(252,3,176,0.25)", cursor: "pointer" }}>{ctaText}</a>
          </div>
        )}
      </div>
    </section>
  )
}