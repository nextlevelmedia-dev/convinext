import Header from "@/components/Header"
import Hero from "@/components/Hero"
import DeviceMockups from "@/components/DeviceMockups/DeviceMockups"
import { client } from "@/sanity/lib/client"

const query = `*[_type == "page" && slug.current == "ecommerce"][0]{
  hero
}`

export default async function EcommercePage() {
  const page = await client.fetch(query)

  return (
    <>
      <Header />

      <main>
        <Hero
          {...page?.hero}
          rightContent={<DeviceMockups />}
        />
      </main>
    </>
  )
}