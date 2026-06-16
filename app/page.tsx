import Header from "../components/Header"
import Hero from "../components/Hero"
import ProjectCarousel from "../components/ProjectCarousel/ProjectCarousel"
import StickyServices from "../components/StickyServices/StickyServices"
import ReviewsSection from "../components/ReviewsSection/ReviewsSection"
import LogoMarquee from "../components/LogoMarquee/LogoMarquee"
import VantaggioUnico from "../components/VantaggioUnico/VantaggioUnico"
import ValueProps from "../components/ValueProps/ValueProps"
import TeamCards from "../components/TeamCards/TeamCards"
import ContactSection from "../components/ContactSection/ContactSection"
import { client } from "../sanity/lib/client"

const fallbackServices = [
  {
    label: "Ecommerce Solutions",
    title: "Ecommerce Shopify",
    text: "Ottieni più vendite con un ecommerce Shopify progettato per convertire e offrire un'esperienza fluida.",
    cta: "Ottimizza il tuo ecommerce",
    href: "/ecommerce",
    videoWebm: "https://next-level-media.it/wp-content/uploads/2026/03/Ecommerce.webm",
    videoMp4: "https://next-level-media.it/wp-content/uploads/2026/03/Ecommerce.mp4",
  },
  {
    label: "Conversion Optimization",
    title: "Ottimizzazione Conversioni",
    text: "Genera più ricavi dagli stessi visitatori migliorando conversioni e performance.",
    cta: "Ottieni di più dal tuo traffico",
    href: "/ottimizzazione-conversioni",
    lottie: "Stats-Going-Up (1).json",
  },
  {
    label: "Web Performance",
    title: "Siti Web Performanti",
    text: "Ottieni più lead e clienti con pagine ottimizzate per guidare ogni utente all'azione.",
    cta: "Ottimizza il tuo sito web",
    href: "/siti-web",
    videoWebm: "https://next-level-media.it/wp-content/uploads/2025/12/website.webm",
    videoMp4: "https://next-level-media.it/wp-content/uploads/2025/12/website.mp4",
  },
]

const query = `*[_type == "page" && slug.current == "home"][0]{
  hero,
  homeProjects{
    title,
    highlight,
    titleTwo,
    subtitle,
    ctaLabel,
    ctaText,
    ctaHref
  },
  logoMarquee{
    logosRowOne[]{ alt, logo{asset->{_id,url}} },
    logosRowTwo[]{ alt, logo{asset->{_id,url}} }
  },
  vantaggioUnico{
    titleOne,
    highlightOne,
    titleTwo,
    highlightTwo,
    titleThree,
    subtitle,
    ctaText,
    ctaHref
  },
  valueProps[]{
    label,
    titleHighlight,
    titleNormal,
    subtitle,
    ctaText,
    ctaHref,
    mediaType,
    image{ asset->{ _id, url } },
    videoWebm,
    videoMp4,
    lottieFile
  },
  stickyServices{
    titleHighlight,
    titleNormal,
    subtitle
  },
  teamCards{
    titleHighlight,
    titleNormal,
    subtitle,
    cards[]{ title, description, lottieFile }
  },
  reviews{
    titleHighlight,
    titleNormal,
    ctaText,
    ctaHref,
    socialProofText,
    socialProofAvatars[]{ photo{ asset->{ _id, url } } },
    items[]{
      stars,
      reviewTitle,
      reviewText,
      authorName,
      authorRole,
      authorPhoto{ asset->{ _id, url } },
      companyLogo{ asset->{ _id, url } }
    }
  }
}`

export default async function Home() {
  const page = await client.fetch(query)

  return (
    <>
      <Header />
      <main>
        <Hero {...page?.hero} />

        <ReviewsSection
          titleHighlight={page?.reviews?.titleHighlight}
          titleNormal={page?.reviews?.titleNormal}
          items={page?.reviews?.items}
          ctaText={page?.reviews?.ctaText}
          ctaHref={page?.reviews?.ctaHref}
          socialProofText={page?.reviews?.socialProofText}
          socialProofAvatars={page?.reviews?.socialProofAvatars}
        />

        <LogoMarquee
          logosRowOne={page?.logoMarquee?.logosRowOne}
          logosRowTwo={page?.logoMarquee?.logosRowTwo}
        />

        <VantaggioUnico
          titleOne={page?.vantaggioUnico?.titleOne}
          highlightOne={page?.vantaggioUnico?.highlightOne}
          titleTwo={page?.vantaggioUnico?.titleTwo}
          highlightTwo={page?.vantaggioUnico?.highlightTwo}
          titleThree={page?.vantaggioUnico?.titleThree}
          subtitle={page?.vantaggioUnico?.subtitle}
          ctaText={page?.vantaggioUnico?.ctaText}
          ctaHref={page?.vantaggioUnico?.ctaHref}
        />

        <ValueProps items={page?.valueProps} />

        <StickyServices
          titleHighlight={page?.stickyServices?.titleHighlight}
          titleNormal={page?.stickyServices?.titleNormal}
          subtitle={page?.stickyServices?.subtitle}
          services={fallbackServices}
        />

        <section className="px-6 pt-24 text-center text-slate-950">
          <div className="mx-auto max-w-2xl">
            {page?.homeProjects?.title && (
              <h2 className="text-4xl font-black leading-[1.2] tracking-tight md:text-[42px]">
                {page.homeProjects.title}{" "}
                {page?.homeProjects?.highlight && (
                  <span className="bg-brand-gradient bg-clip-text text-transparent">
                    {page.homeProjects.highlight}
                  </span>
                )}
                {" "}
                {page?.homeProjects?.titleTwo}
              </h2>
            )}
            {page?.homeProjects?.subtitle && (
              <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">
                {page.homeProjects.subtitle}
              </p>
            )}
          </div>
        </section>

        <ProjectCarousel
          ctaLabel={page?.homeProjects?.ctaLabel}
          ctaText={page?.homeProjects?.ctaText}
          ctaHref={page?.homeProjects?.ctaHref}
        />

        <TeamCards {...page?.teamCards} />

        <ContactSection />
      </main>
    </>
  )
}