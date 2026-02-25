"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useMemo, useRef } from "react"

type Layer = {
  key: string
  src: string
  depth: number
  className?: string
  delay: number
}

export function HomeScene({
  enableParallax = true,
}: {
  enableParallax?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const layers: Layer[] = useMemo(
    () => [
      { key: "bg", src: "/home-bg/bg.webp", depth: 0.15, delay: 0.00 },
      { key: "rocks3", src: "/home-bg/rocks-3.webp", depth: 0, delay: 0.34, className: "rocks3" },
      { key: "rocks2", src: "/home-bg/rocks-2.webp", depth: 0, delay: 0.29, className: "rocks2" },
      { key: "rocks1", src: "/home-bg/rocks-1.webp", depth: 0, delay: 0.24, className: "rocks1" },
      { key: "diamond", src: "/home-bg/diamond.webp", depth: 0.2, delay: 0.44, className: "diamond" },
      { key: "sparkles", src: "/home-bg/sparkles.webp", depth: 0.9, delay: 0.39 },
      { key: "character", src: "/home-bg/character.webp", depth: 0.6, delay: 0.16, className: "character" },
    ],
    []
  )

  // Parallax souris (après l’entrée, c’est ok)
  useEffect(() => {
    if (!enableParallax) return
    const container = containerRef.current
    if (!container) return

    const nodes = Array.from(
      container.querySelectorAll<HTMLElement>("[data-depth]")
    )

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      targetX = x
      targetY = y
    }

    const loop = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08

      nodes.forEach((el) => {
        const d = Number(el.dataset.depth || 0)
        const moveX = currentX * d * 26
        const moveY = currentY * d * 18
        // On applique la parallax via CSS variables pour ne pas écraser l’anim Framer (voir CSS plus bas)
        el.style.setProperty("--px", `${moveX}px`)
        el.style.setProperty("--py", `${moveY}px`)
      })

      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [enableParallax])

  return (
    <div ref={containerRef} className="homeScene" aria-hidden>
      {layers.map((l) => (
        <motion.div
          key={l.key}
          className="homeLayerWrap"
          initial={{ y: 140, opacity: 0 }}
          animate={{ y: 0, opacity: 1.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: l.delay }}
        >
          <Image
            src={l.src}
            alt=""
            fill
            priority={l.key === "bg"} // preload seulement le BG
            sizes="100vw"
            className={`homeLayer ${l.className ?? ""}`}
            data-depth={l.depth}
          />
        </motion.div>
      ))}

      <div className="homeVignette" />
    </div>
  )
}
