import Header from "../components/Header"
import Hero from "../components/Hero"
import ProjectCarousel from "../components/ProjectCarousel/ProjectCarousel"
import StickyServices from "../components/StickyServices/StickyServices"
import LogoMarquee from "../components/LogoMarquee/LogoMarquee"
import { client } from "../sanity/lib/client"

const query = `*[_type == "page" && slug.current == "home"][0]{
  hero,
  homeProjects,
  logoMarquee{
    title,
    subtitle,
    logosRowOne[]{
      alt,
      logo{asset->{_id,url}}
    },
    logosRowTwo[]{
      alt,
      logo{asset->{_id,url}}
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

        <section className="bg-white px-6 pt-24 text-center text-slate-950">
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

        <ProjectCarousel />

        <StickyServices />

        <LogoMarquee {...page?.logoMarquee} />
      </main>
    </>
  )
}