import Header from "@/components/Header"
import Hero from "@/components/Hero"
import DeviceMockups from "@/components/DeviceMockups/DeviceMockups"
import ImpactSection from "@/components/ImpactSection/ImpactSection"
import MockupMarquee from "@/components/MockupMarquee/MockupMarquee"
import ReviewsSection from "@/components/ReviewsSection/ReviewsSection"
import ValueProps from "@/components/ValueProps/ValueProps"
import BenefitsSection from "@/components/BenefitsSection/BenefitsSection"
import ProcessSitiWeb from "@/components/ProcessTimeline/ProcessSitiWeb"
import FinalRecap from "@/components/FinalRecap/FinalRecap"
import FaqSection from "@/components/FaqSection/FaqSection"
import ContactSection from "@/components/ContactSection/ContactSection"
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
    hero,
    impactSection{
      titleHighlight,
      titleNormal,
      subtitle,
      impactText
    },
    mockupMarquee{
      rowOne[]{ image{ asset->{ _id, url } }, alt },
      rowTwo[]{ image{ asset->{ _id, url } }, alt }
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
      lottieFile,
      modelUrl,
      componentKey
    },
    benefits{
      titleHighlight,
      titleNormal,
      ctaText,
      ctaHref,
      items[]{
        image{ asset->{ _id, url } },
        title,
        description
      }
    },
    processSection{
      titleHighlight,
      titleNormal,
      subtitle,
      steps[]{ title, description }
    },
    faqSection{
      titleHighlight,
      titleNormal,
      items[]{ question, answer }
    },
    finalRecap{
      eyebrow,
      titleHighlight,
      titleNormal,
      subtitle,
      bulletPoints,
      ctaText,
      ctaHref,
      ctaSubText,
      mediaType,
      image{ asset->{ _id, url } },
      videoWebm,
      videoMp4,
      lottieFile
    }
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
          rightContent={<DeviceMockups slides={sitiWebSlides} />}
        />

        <ImpactSection
          titleHighlight={data?.impactSection?.titleHighlight}
          titleNormal={data?.impactSection?.titleNormal}
          subtitle={data?.impactSection?.subtitle}
          impactText={data?.impactSection?.impactText}
        />

        <MockupMarquee
          rowOne={data?.mockupMarquee?.rowOne}
          rowTwo={data?.mockupMarquee?.rowTwo}
        />

        <ReviewsSection
          titleHighlight={data?.reviews?.titleHighlight}
          titleNormal={data?.reviews?.titleNormal}
          items={data?.reviews?.items}
          ctaText={data?.reviews?.ctaText}
          ctaHref={data?.reviews?.ctaHref}
          socialProofText={data?.reviews?.socialProofText}
          socialProofAvatars={data?.reviews?.socialProofAvatars}
        />

        <ValueProps items={data?.valueProps} />

        <BenefitsSection
          titleHighlight={data?.benefits?.titleHighlight}
          titleNormal={data?.benefits?.titleNormal}
          ctaText={data?.benefits?.ctaText}
          ctaHref={data?.benefits?.ctaHref}
          items={data?.benefits?.items}
        />

        <ProcessSitiWeb
          titleHighlight={data?.processSection?.titleHighlight}
          titleNormal={data?.processSection?.titleNormal}
          subtitle={data?.processSection?.subtitle}
          steps={data?.processSection?.steps}
        />

        <FinalRecap
          eyebrow={data?.finalRecap?.eyebrow}
          titleHighlight={data?.finalRecap?.titleHighlight}
          titleNormal={data?.finalRecap?.titleNormal}
          subtitle={data?.finalRecap?.subtitle}
          bulletPoints={data?.finalRecap?.bulletPoints}
          ctaText={data?.finalRecap?.ctaText}
          ctaHref={data?.finalRecap?.ctaHref}
          ctaSubText={data?.finalRecap?.ctaSubText}
          mediaType={data?.finalRecap?.mediaType}
          image={data?.finalRecap?.image}
          videoWebm={data?.finalRecap?.videoWebm}
          videoMp4={data?.finalRecap?.videoMp4}
          lottieFile={data?.finalRecap?.lottieFile}
        />

        <FaqSection
          titleHighlight={data?.faqSection?.titleHighlight}
          titleNormal={data?.faqSection?.titleNormal}
          items={data?.faqSection?.items}
        />

        <ContactSection />
      </main>
    </>
  )
}