'use client'

import { useEffect, useMemo } from 'react'
import './DeviceMockups.css'

type MockupSlide = {
  imac: string
  tablet: string
  mobile: string
}

type DeviceMockupsProps = {
  slides?: MockupSlide[]
}

const defaultSlides: MockupSlide[] = [
  {
    imac: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-imac-hero-next-11.webp',
    tablet: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-tablet-next-hero-1264-x-856-px-19.webp',
    mobile: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-iphone-next-hero-10.webp',
  },
  {
    imac: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-imac-hero-next-14.webp',
    tablet: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-tablet-next-hero-1264-x-856-px-22.webp',
    mobile: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-iphone-next-hero-13.webp',
  },
  {
    imac: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-imac-hero-next-13.webp',
    tablet: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-tablet-next-hero-1264-x-856-px-21.webp',
    mobile: 'https://next-level-media.it/wp-content/uploads/2026/04/mockup-iphone-next-hero-12.webp',
  },
]

export default function DeviceMockups({ slides = defaultSlides }: DeviceMockupsProps) {
  const safeSlides = useMemo(() => slides.filter(Boolean), [slides])
  const firstSlide = safeSlides[0]

  useEffect(() => {
    if (!safeSlides.length) return

    const imac = document.querySelector<HTMLImageElement>('.imac-screen')
    const tablet = document.querySelector<HTMLImageElement>('.tablet-screen')
    const mobile = document.querySelector<HTMLImageElement>('.mobile-screen')

    if (!imac || !tablet || !mobile) return

    let index = 1

    const createTemp = (el: HTMLImageElement, src: string) => {
      const temp = document.createElement('img')
      temp.src = src
      temp.className = 'screen-img temp-screen'

      Object.assign(temp.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: '3',
        transform: 'translateX(100%)',
        transition: 'transform .55s cubic-bezier(.4,0,.2,1)',
      })

      el.closest('.screen')?.appendChild(temp)
      return temp
    }

    const changeSlide = () => {
      const slide = safeSlides[index]

      const tempImac = createTemp(imac, slide.imac)
      const tempTablet = createTemp(tablet, slide.tablet)
      const tempMobile = createTemp(mobile, slide.mobile)

      void tempImac.offsetWidth

      tempImac.style.transform = 'translateX(0)'
      tempTablet.style.transform = 'translateX(0)'
      tempMobile.style.transform = 'translateX(0)'

      setTimeout(() => {
        imac.src = slide.imac
        tablet.src = slide.tablet
        mobile.src = slide.mobile

        tempImac.remove()
        tempTablet.remove()
        tempMobile.remove()
      }, 550)

      index = (index + 1) % safeSlides.length
    }

    if (safeSlides.length > 1) {
      const interval = setInterval(changeSlide, 2800)
      return () => clearInterval(interval)
    }
  }, [safeSlides])

  return (
    <div className="mockup-row">
      <div className="mockup-stage">
        <div className="mockup-shadow" />

        <div className="device-mockup imac">
          <img
            className="frame"
            src="/frame-imac.webp"
            alt="iMac frame"
            width={620}
            height={520}
            fetchPriority="high"
          />
          <div className="screen">
            <img
              className="screen-img imac-screen"
              src={firstSlide?.imac}
              alt="iMac screen"
              fetchPriority="high"
              width={1280}
              height={800}
            />
          </div>
        </div>

        <div className="device-mockup tablet">
          <img
            className="frame"
            src="/frame-tablet.webp"
            alt="Tablet frame"
            width={430}
            height={580}
            fetchPriority="high"
          />
          <div className="screen">
            <img
              className="screen-img tablet-screen"
              src={firstSlide?.tablet}
              alt="Tablet screen"
              fetchPriority="high"
              width={800}
              height={600}
            />
          </div>
        </div>

        <div className="device-mockup mobile">
          <img
            className="frame"
            src="/frame-mobile.webp"
            alt="Mobile frame"
            width={280}
            height={560}
            fetchPriority="high"
          />
          <div className="screen">
            <img
              className="screen-img mobile-screen"
              src={firstSlide?.mobile}
              alt="Mobile screen"
              fetchPriority="high"
              width={390}
              height={844}
            />
          </div>
        </div>

      </div>
    </div>
  )
}