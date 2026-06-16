import Header from "@/components/Header"
import ContactSection from "@/components/ContactSection/ContactSection"
import { client } from "@/sanity/lib/client"
import Image from "next/image"

const query = `{
  "page": *[_type == "page" && slug.current == "progetti"][0]{
    hero{ title, highlightOne, titleTwo, subtitle, ctaText, ctaHref }
  },
  "projects": *[_type == "project"] | order(order asc) {
    title,
    description,
    href,
    image{ asset->{ _id, url } }
  }
}`

type Project = {
  title: string
  description?: string
  href?: string
  image?: { asset: { url: string } }
}

function ProjectCard({ project }: { project: Project }) {
  const imageUrl = project.image?.asset?.url
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-slate-300">
      {imageUrl && (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image src={imageUrl} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-black text-slate-950 mb-2">{project.title}</h3>
        {project.description && (
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">{project.description}</p>
        )}
      </div>
    </div>
  )
}

export default async function ProgettiPage() {
  const data = await client.fetch(query)
  const hero = data?.page?.hero
  const projects: Project[] = data?.projects ?? []
  const ctaHref = hero?.ctaHref ?? "/contatti"

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16 items-start">

              <div className="lg:sticky lg:top-32">
                <h1 className="text-4xl font-black leading-[1.2] tracking-tight text-slate-950 md:text-5xl mb-6">
                  {hero?.title}{" "}
                  {hero?.highlightOne && (
                    <span className="bg-brand-gradient bg-clip-text text-transparent">{hero.highlightOne}</span>
                  )}{" "}
                  {hero?.titleTwo}
                </h1>

                {hero?.subtitle && (
                  <p className="text-lg font-semibold leading-8 text-slate-800 mb-8">{hero.subtitle}</p>
                )}

                <div className="pt-8 border-t border-slate-200 mb-8">
                  <div className="flex items-center gap-4">
                    <p className="text-sm leading-6 text-slate-500 w-5/6">
                      Alcuni di questi progetti sono stati realizzati per conto di Pixel Wave.
                    </p>
                    <div className="shrink-0 w-1/6">
                      <img
                        src="PixelWaveLogo3-61fa153c.webp"
                        alt="Pixel Wave"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>

                {hero?.ctaText && (
                  <a href={ctaHref} className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-8 py-4 font-bold !text-white shadow-xl">
                    {hero.ctaText}
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project, i) => (
                  <ProjectCard key={i} project={project} />
                ))}
              </div>

            </div>
          </div>
        </section>
        <ContactSection />
      </main>
    </>
  )
}