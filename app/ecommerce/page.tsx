import Header from "@/components/Header"
import Hero from "@/components/Hero"
import DeviceMockups from "@/components/DeviceMockups/DeviceMockups"
import ImpactSection from "@/components/ImpactSection/ImpactSection"
import MockupMarquee from "@/components/MockupMarquee/MockupMarquee"
import ReviewsSection from "@/components/ReviewsSection/ReviewsSection"
import ValueProps from "@/components/ValueProps/ValueProps"
import BenefitsSection from "@/components/BenefitsSection/BenefitsSection"
import ProcessEcommerce from "@/components/ProcessTimeline/ProcessEcommerce"
import FinalRecap from "@/components/FinalRecap/FinalRecap"
import FaqSection from "@/components/FaqSection/FaqSection"
import ContactSection from "@/components/ContactSection/ContactSection"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

const query = `*[_type == "page" && slug.current == "ecommerce"][0]{
  hero,
  mockupSlides[]{
    imac{ asset->{ _id, url } },
    tablet{ asset->{ _id, url } },
    mobile{ asset->{ _id, url } }
  },
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

export default async function EcommercePage() {
  const page = await client.fetch(query)

  const mockupSlides = page?.mockupSlides
    ?.filter((s: any) => s?.imac?.asset && s?.tablet?.asset && s?.mobile?.asset)
    .map((s: any) => ({
      imac: urlFor(s.imac).width(1280).height(800).format("webp").url(),
      tablet: urlFor(s.tablet).width(800).height(600).format("webp").url(),
      mobile: urlFor(s.mobile).width(390).height(844).format("webp").url(),
    }))

  return (
    <>
      <Header />
      <main>
        <Hero
          {...page?.hero}
          rightContent={<DeviceMockups slides={mockupSlides?.length ? mockupSlides : undefined} />}
        />

        <ImpactSection
          titleHighlight={page?.impactSection?.titleHighlight}
          titleNormal={page?.impactSection?.titleNormal}
          subtitle={page?.impactSection?.subtitle}
          impactText={page?.impactSection?.impactText}
        />

        <MockupMarquee
          rowOne={page?.mockupMarquee?.rowOne}
          rowTwo={page?.mockupMarquee?.rowTwo}
        />

        <ReviewsSection
          titleHighlight={page?.reviews?.titleHighlight}
          titleNormal={page?.reviews?.titleNormal}
          items={page?.reviews?.items}
          ctaText={page?.reviews?.ctaText}
          ctaHref={page?.reviews?.ctaHref}
          socialProofText={page?.reviews?.socialProofText}
          socialProofAvatars={page?.reviews?.socialProofAvatars}
        />

        <ValueProps items={page?.valueProps} />

        <BenefitsSection
          titleHighlight={page?.benefits?.titleHighlight}
          titleNormal={page?.benefits?.titleNormal}
          ctaText={page?.benefits?.ctaText}
          ctaHref={page?.benefits?.ctaHref}
          items={page?.benefits?.items}
        />

        <ProcessEcommerce
          titleHighlight={page?.processSection?.titleHighlight}
          titleNormal={page?.processSection?.titleNormal}
          subtitle={page?.processSection?.subtitle}
          steps={page?.processSection?.steps}
        />

        <FinalRecap
          eyebrow={page?.finalRecap?.eyebrow}
          titleHighlight={page?.finalRecap?.titleHighlight}
          titleNormal={page?.finalRecap?.titleNormal}
          subtitle={page?.finalRecap?.subtitle}
          bulletPoints={page?.finalRecap?.bulletPoints}
          ctaText={page?.finalRecap?.ctaText}
          ctaHref={page?.finalRecap?.ctaHref}
          ctaSubText={page?.finalRecap?.ctaSubText}
          mediaType={page?.finalRecap?.mediaType}
          image={page?.finalRecap?.image}
          videoWebm={page?.finalRecap?.videoWebm}
          videoMp4={page?.finalRecap?.videoMp4}
          lottieFile={page?.finalRecap?.lottieFile}
        />

        <FaqSection
          titleHighlight={page?.faqSection?.titleHighlight}
          titleNormal={page?.faqSection?.titleNormal}
          items={page?.faqSection?.items}
        />

        <ContactSection />
      </main>
    </>
  )
}