import Header from "@/components/Header"
import HeroChiSiamo from "@/components/HeroChiSiamo/HeroChiSiamo"
import ContactSection from "@/components/ContactSection/ContactSection"
import { client } from "@/sanity/lib/client"

const query = `*[_type == "page" && slug.current == "chi-siamo"][0]{
  hero{
    eyebrow,
    title,
    highlightOne,
    titleTwo,
    highlightTwo,
    subtitle,
    ctaText,
    lottieFile
  }
}`

export default async function ChiSiamoPage() {
  const page = await client.fetch(query)

  return (
    <>
      <Header />
      <main>
        <HeroChiSiamo
          eyebrow={page?.hero?.eyebrow}
          title={page?.hero?.title}
          highlightOne={page?.hero?.highlightOne}
          titleTwo={page?.hero?.titleTwo}
          highlightTwo={page?.hero?.highlightTwo}
          subtitle={page?.hero?.subtitle}
          ctaText={page?.hero?.ctaText}
          lottieFile={page?.hero?.lottieFile}
        />
        <ContactSection />
      </main>
    </>
  )
}