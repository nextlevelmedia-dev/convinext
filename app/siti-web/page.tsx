import Header from "@/components/Header"
import Hero from "@/components/Hero"
import DeviceMockups from "@/components/DeviceMockups/DeviceMockups"

import { client } from "@/sanity/lib/client"

const sitiWebSlides = [
  {
    imac: "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-imac-hero-next-10.webp",
    tablet: "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-tablet-next-hero-1264-x-856-px-9.webp",
    mobile: "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-iphone-next-hero-9.webp",
  },
  {
    imac: "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-imac-hero-next-6.webp",
    tablet: "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-tablet-next-hero-1264-x-856-px-6.webp",
    mobile: "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-iphone-next-hero-6.webp",
  },
  {
    imac: "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-imac-hero-next-2.webp",
    tablet: "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-tablet-next-hero-1264-x-856-px-2.webp",
    mobile: "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-iphone-next-hero-2.webp",
  },
  {
    imac: "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-imac-hero-next-7.webp",
    tablet: "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-imac-hero-next-8.webp",
    mobile: "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-iphone-next-hero-7.webp",
  },
]

async function getPageData() {
  const query = `*[_type == "page" && slug.current == "siti-web"][0]{
    hero
  }`

  return client.fetch(query)
}

export default async function SitiWebPage() {
  const data = await getPageData()

  return (
    <>
      <Header />

      <main>
        <Hero
          eyebrow={data.hero.eyebrow}
          title={data.hero.title}
          highlightOne={data.hero.highlightOne}
          titleTwo={data.hero.titleTwo}
          highlightTwo={data.hero.highlightTwo}
          subtitle={data.hero.subtitle}
          ctaText={data.hero.ctaText}
          rightContent={
            <DeviceMockups slides={sitiWebSlides} />
          }
        />
      </main>
    </>
  )
}