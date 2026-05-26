"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

interface ThreeViewerProps {
  modelUrl: string
}

export default function ThreeViewer({ modelUrl }: ThreeViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !stageRef.current) return

    const canvas = canvasRef.current
    const stage = stageRef.current
    let animId: number
    let needsRender = true

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.useLegacyLights = false

    const scene = new THREE.Scene()
    scene.background = null

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200)
    camera.position.set(0, 0.2, 4.0)

    // lights
    scene.add(new THREE.HemisphereLight(0xffffff, 0xeeeeee, 1.0))
    const key = new THREE.DirectionalLight(0xffffff, 2.7); key.position.set(4, 6, 6); scene.add(key)
    const fill = new THREE.DirectionalLight(0xffffff, 1.2); fill.position.set(-6, 2.5, 4); scene.add(fill)
    const rim = new THREE.DirectionalLight(0xffffff, 1.4); rim.position.set(-2, 5, -6); scene.add(rim)

    const rotationGroup = new THREE.Group()
    scene.add(rotationGroup)

    // fake shadow
    const shadowCanvas = document.createElement("canvas")
    shadowCanvas.width = shadowCanvas.height = 512
    const ctx = shadowCanvas.getContext("2d")!
    const g = ctx.createRadialGradient(256, 256, 51, 256, 256, 245)
    g.addColorStop(0.0, "rgba(0,0,0,0.35)")
    g.addColorStop(0.35, "rgba(0,0,0,0.18)")
    g.addColorStop(0.70, "rgba(0,0,0,0.06)")
    g.addColorStop(1.0, "rgba(0,0,0,0.00)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 512, 512)
    const shadowTex = new THREE.CanvasTexture(shadowCanvas)
    shadowTex.minFilter = THREE.LinearFilter
    shadowTex.generateMipmaps = false
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 2.2),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.55 })
    )
    shadowMesh.rotation.x = -Math.PI / 2
    shadowMesh.position.y = -0.55
    shadowMesh.renderOrder = -1
    scene.add(shadowMesh)

    // resize
    function resize() {
      const rect = stage.getBoundingClientRect()
      const w = Math.max(1, rect.width)
      const h = Math.max(1, rect.height)
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      camera.position.z = window.matchMedia("(max-width:640px)").matches ? 4.7 : 4.0
      needsRender = true
    }
    window.addEventListener("resize", resize, { passive: true })
    if (window.ResizeObserver) new ResizeObserver(resize).observe(stage)
    resize()

    // render loop
    ;(function raf() {
      animId = requestAnimationFrame(raf)
      if (!needsRender) return
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      needsRender = false
    })()

    // scroll rotation (senza GSAP — puro scroll)
    let scrollY = window.scrollY
    function onScroll() {
      const delta = window.scrollY - scrollY
      scrollY = window.scrollY
      rotationGroup.rotation.y += delta * 0.005
      needsRender = true
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // load model
    const draco = new DRACOLoader()
    draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/")

    const loader = new GLTFLoader()
    loader.setDRACOLoader(draco)

    loader.load(
      modelUrl,
      (gltf) => {
        rotationGroup.add(gltf.scene)

        gltf.scene.traverse((obj: any) => {
          if (obj.isMesh && obj.material) {
            obj.material.side = THREE.DoubleSide
            obj.material.needsUpdate = true
          }
        })

        const box = new THREE.Box3().setFromObject(rotationGroup)
        const size = new THREE.Vector3()
        const center = new THREE.Vector3()
        box.getSize(size)
        box.getCenter(center)
        rotationGroup.position.sub(center)

        const maxDim = Math.max(size.x, size.y, size.z) || 1
        const s = 1.55 / maxDim
        rotationGroup.scale.setScalar(s)
        rotationGroup.rotation.set(0.12, Math.PI * 0.72, 0)
        rotationGroup.position.y += 0.1

        shadowMesh.scale.setScalar(s)
        shadowMesh.position.y = rotationGroup.position.y - 0.95

        needsRender = true
      },
      undefined,
      (err) => console.error("GLB load error:", err)
    )

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", onScroll)
      renderer.dispose()
    }
  }, [modelUrl])

  return (
    <div
      ref={stageRef}
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        background: "transparent",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          background: "transparent",
        }}
      />
    </div>
  )
}