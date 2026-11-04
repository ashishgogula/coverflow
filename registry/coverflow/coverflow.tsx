'use client'

import { memo, useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type PanInfo,
  type MotionValue,
} from 'motion/react'

type Direction = 'left' | 'right'

const AudioCtx: typeof AudioContext | null =
  typeof window !== 'undefined'
    ? (window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext ?? null)
    : null

function useTickAudio(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null)

  useEffect(() => () => { ctxRef.current?.close().catch(() => {}); ctxRef.current = null }, [])

  useEffect(() => {
    if (!enabled || !AudioCtx) return
    const warm = () => {
      if (!ctxRef.current) ctxRef.current = new AudioCtx!()
      if (ctxRef.current.state === 'suspended') ctxRef.current.resume().catch(() => {})
    }
    window.addEventListener('pointerdown', warm, { once: true })
    return () => window.removeEventListener('pointerdown', warm)
  }, [enabled])

  return useCallback(
    (direction: Direction, velocity = 1) => {
      if (!enabled || !AudioCtx) return

      const getCtx = async () => {
        if (!ctxRef.current) ctxRef.current = new AudioCtx!()
        if (ctxRef.current.state === 'suspended') await ctxRef.current.resume()
        return ctxRef.current
      }

      getCtx().then((ctx) => {
        const t = ctx.currentTime
        const vn = Math.min(Math.abs(velocity) / 300, 1)
        const peakGain = 0.28 * (0.55 + vn * 0.45)
        const freq = 1600 * (0.88 + vn * 0.24)
        const bodyDur = 0.022 - vn * 0.008
        const clickDur = bodyDur * 0.3
        const panStart = direction === 'left' ? 0.7 : -0.7
        const panEnd = direction === 'left' ? -0.7 : 0.7

        const panner = ctx.createStereoPanner()
        panner.pan.setValueAtTime(panStart, t)
        panner.pan.linearRampToValueAtTime(panEnd, t + bodyDur)
        panner.connect(ctx.destination)

        const bodyGain = ctx.createGain()
        bodyGain.gain.setValueAtTime(peakGain, t)
        bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + bodyDur)
        bodyGain.connect(panner)

        const filter = ctx.createBiquadFilter()
        filter.type = 'bandpass'
        filter.frequency.value = freq
        filter.Q.value = 6
        filter.connect(bodyGain)

        const osc = ctx.createOscillator()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq * 1.25, t)
        osc.frequency.exponentialRampToValueAtTime(freq * 0.65, t + bodyDur)
        osc.connect(filter)
        osc.start(t)
        osc.stop(t + bodyDur)

        const nSamples = Math.ceil(ctx.sampleRate * clickDur)
        const noiseBuf = ctx.createBuffer(1, nSamples, ctx.sampleRate)
        const d = noiseBuf.getChannelData(0)
        for (let i = 0; i < nSamples; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (nSamples * 0.2))

        const noiseGain = ctx.createGain()
        noiseGain.gain.setValueAtTime(peakGain * 0.35, t)
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + clickDur)
        noiseGain.connect(panner)

        const noiseHp = ctx.createBiquadFilter()
        noiseHp.type = 'highpass'
        noiseHp.frequency.value = 2400
        noiseHp.connect(noiseGain)

        const noise = ctx.createBufferSource()
        noise.buffer = noiseBuf
        noise.connect(noiseHp)
        noise.start(t)
        noise.stop(t + clickDur)
      }).catch(() => {})
    },
    [enabled],
  )
}

export interface CoverFlowItem {
  id: string | number
  image: string
  title: string
  subtitle?: string
}

export interface RenderImageProps {
  src: string
  alt: string
  width: number
  height: number
  className: string
  draggable: boolean
  sizes: string
  priority?: boolean
  loading?: 'eager' | 'lazy'
}

export interface CoverFlowProps {
  items: CoverFlowItem[]
  itemWidth?: number
  itemHeight?: number
  stackSpacing?: number
  centerGap?: number
  rotation?: number
  initialIndex?: number
  enableReflection?: boolean
  enableClickToSnap?: boolean
  enableScroll?: boolean
  enableAudio?: boolean
  scrollThreshold?: number
  className?: string
  onItemClick?: (item: CoverFlowItem, index: number) => void
  onIndexChange?: (index: number) => void
  renderImage?: (props: RenderImageProps) => ReactNode
}

const defaultRenderImage = (props: RenderImageProps) => (
  <img
    src={props.src}
    alt={props.alt}
    width={props.width}
    height={props.height}
    className={props.className}
    draggable={props.draggable}
    sizes={props.sizes}
    loading={props.loading}
  />
)

function clampIndex(index: number, length: number) {
  return Math.min(Math.max(index, 0), Math.max(length - 1, 0))
}

export function CoverFlow({
  items,
  itemWidth = 400,
  itemHeight = 400,
  stackSpacing = 100,
  centerGap = 250,
  rotation = 50,
  initialIndex = 0,
  enableReflection = false,
  enableClickToSnap = true,
  enableScroll = true,
  enableAudio = false,
  scrollThreshold = 100,
  className,
  onItemClick,
  onIndexChange,
  renderImage,
}: CoverFlowProps) {
  const safeInitial = clampIndex(initialIndex, items.length)
  const [activeIndex, setActiveIndex] = useState(safeInitial)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceId = useId().replace(/:/g, 'x')
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isSafari, setIsSafari] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  useEffect(() => { setIsMounted(true) }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width)
    })
    ro.observe(container)
    return () => ro.disconnect()
  }, [])
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(max-width: 768px), (pointer: coarse)')
    const apply = () => setIsMobile(mql.matches)
    apply()
    mql.addEventListener?.('change', apply)
    return () => mql.removeEventListener?.('change', apply)
  }, [])
  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsSafari(/^((?!chrome|android).)*safari/i.test(window.navigator.userAgent))
  }, [])
  const scale = containerWidth > 0 && itemWidth > 0 ? Math.min(1, (containerWidth * 0.78) / itemWidth) : 1
  const effectiveWidth = Math.round(itemWidth * scale)
  const effectiveHeight = Math.round(itemHeight * scale)
  const effectiveStackSpacing = Math.round(stackSpacing * scale)
  const effectiveCenterGap = Math.round(centerGap * scale)

  const reflectionFilterId = (isMounted && enableReflection && !isMobile && !isSafari) ? `${instanceId}-rf` : undefined
  const showReflection = isMounted && enableReflection
  const activeIndexRef = useRef(activeIndex)
  const enableScrollRef = useRef(enableScroll)
  const scrollThresholdRef = useRef(scrollThreshold)
  const onItemClickRef = useRef(onItemClick)
  const enableClickToSnapRef = useRef(enableClickToSnap)
  const onIndexChangeRef = useRef(onIndexChange)
  const isMountedForCallbackRef = useRef(false)

  activeIndexRef.current = activeIndex
  enableScrollRef.current = enableScroll
  scrollThresholdRef.current = scrollThreshold
  onItemClickRef.current = onItemClick
  enableClickToSnapRef.current = enableClickToSnap
  onIndexChangeRef.current = onIndexChange

  const prefersReducedMotion = useReducedMotion()
  const scrollX = useMotionValue(safeInitial)
  const springX = useSpring(scrollX, { stiffness: 150, damping: 30, mass: 1 })
  const effectiveScrollX = prefersReducedMotion ? scrollX : springX
  const tick = useTickAudio(enableAudio)

  useEffect(() => {
    const clamped = clampIndex(initialIndex, items.length)
    if (clamped !== activeIndexRef.current) {
      setActiveIndex(clamped)
      scrollX.set(clamped)
    }
  }, [initialIndex, items.length, scrollX])

  useEffect(() => {
    if (!isMountedForCallbackRef.current) { isMountedForCallbackRef.current = true; return }
    onIndexChangeRef.current?.(activeIndex)
  }, [activeIndex])

  const jumpToIndex = useCallback(
    (index: number, velocity = 0, direction?: Direction) => {
      const clamped = clampIndex(index, items.length)
      const prev = activeIndexRef.current
      if (clamped === prev) return
      const dir: Direction = direction ?? (clamped > prev ? 'right' : 'left')
      setActiveIndex(clamped)
      scrollX.set(clamped)
      tick(dir, velocity)
    },
    [items.length, scrollX, tick],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let accumulator = 0
    let lastTime = Date.now()
    let lastJump = 0

    const handleWheel = (e: WheelEvent) => {
      if (!enableScrollRef.current) return
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return
      e.preventDefault()

      const now = Date.now()
      if (now - lastTime > 200) accumulator = 0
      lastTime = now
      accumulator += e.deltaX

      const threshold = scrollThresholdRef.current
      const shouldJump =
        (accumulator > threshold || accumulator < -threshold) &&
        now - lastJump > 150

      if (shouldJump) {
        const dir = accumulator > 0 ? 'right' : 'left'
        jumpToIndex(Math.round(scrollX.get()) + (dir === 'right' ? 1 : -1), Math.abs(e.deltaX), dir)
        accumulator = 0
        lastJump = now
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [jumpToIndex, scrollX])

  const handleCardClick = useCallback(
    (item: CoverFlowItem, index: number) => {
      if (index === activeIndexRef.current) {
        onItemClickRef.current?.(item, index)
      } else if (enableClickToSnapRef.current) {
        jumpToIndex(index)
      }
    },
    [jumpToIndex],
  )

  const onDragStart = useCallback(() => setIsDragging(true), [])

  const onDrag = useCallback(
    (_: unknown, info: PanInfo) => {
      scrollX.set(scrollX.get() - info.delta.x / (effectiveCenterGap * 0.8))
    },
    [effectiveCenterGap, scrollX],
  )

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setIsDragging(false)
      const projected = scrollX.get() - info.velocity.x * 0.002
      const clamped = clampIndex(Math.round(projected), items.length)
      const prev = activeIndexRef.current
      const dir: Direction = clamped >= prev ? 'right' : 'left'
      setActiveIndex(clamped)
      scrollX.set(clamped)
      if (clamped !== prev) tick(dir, Math.abs(info.velocity.x))
    },
    [items.length, scrollX, tick],
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); jumpToIndex(activeIndexRef.current - 1, 120, 'left') }
      if (e.key === 'ArrowRight') { e.preventDefault(); jumpToIndex(activeIndexRef.current + 1, 120, 'right') }
    },
    [jumpToIndex],
  )

  if (items.length === 0) return null

  return (
    <>
      {reflectionFilterId && (
        <svg aria-hidden="true" focusable="false" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
          <defs>
            <filter id={reflectionFilterId} x="-3%" y="-3%" width="106%" height="106%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.018 0.065" numOctaves="3" seed="8" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feGaussianBlur in="displaced" stdDeviation="0.4 1.8" />
            </filter>
          </defs>
        </svg>
      )}
      <motion.div
        ref={containerRef}
        className={`group/cf relative w-full h-full flex flex-col justify-center items-center overflow-hidden bg-transparent focus:outline-none touch-pan-y ${
          isDragging ? 'is-dragging cursor-grabbing' : 'cursor-grab'
        } ${className ?? ''}`}
        style={{ perspective: 1000 }}
        role="region"
        aria-label="Cover Flow"
        tabIndex={0}
        onKeyDown={onKeyDown}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        <div
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {items.map((item, index) => (
            <CoverFlowItemCard
              key={item.id}
              item={item}
              index={index}
              scrollX={effectiveScrollX}
              width={effectiveWidth}
              height={effectiveHeight}
              stackSpacing={effectiveStackSpacing}
              centerGap={effectiveCenterGap}
              rotation={rotation}
              isActive={index === activeIndex}
              showReflection={showReflection}
              reflectionFilterId={reflectionFilterId}
              enableClickToSnap={enableClickToSnap}
              reduceMotion={prefersReducedMotion ?? false}
              renderImage={renderImage}
              onCardClick={handleCardClick}
            />
          ))}
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -6 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: 'easeOut' }}
              className="text-center"
            >
              <h3 className="text-2xl font-semibold text-foreground tracking-tight drop-shadow-md">
                {items[activeIndex]?.title}
              </h3>
              {items[activeIndex]?.subtitle && (
                <p className="text-foreground/60 text-sm mt-1 font-medium tracking-wide">
                  {items[activeIndex]?.subtitle}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}

interface CardProps {
  item: CoverFlowItem
  index: number
  scrollX: MotionValue<number>
  width: number
  height: number
  stackSpacing: number
  centerGap: number
  rotation: number
  isActive: boolean
  showReflection: boolean
  reflectionFilterId?: string
  enableClickToSnap: boolean
  reduceMotion: boolean
  renderImage?: (props: RenderImageProps) => ReactNode
  onCardClick: (item: CoverFlowItem, index: number) => void
}

const CoverFlowItemCard = memo(function CoverFlowItemCard({
  item,
  index,
  scrollX,
  width,
  height,
  stackSpacing,
  centerGap,
  rotation,
  isActive,
  showReflection,
  reflectionFilterId,
  enableClickToSnap,
  reduceMotion,
  renderImage,
  onCardClick,
}: CardProps) {
  const rotateY = useTransform(scrollX, (value) => {
    if (reduceMotion) return 0
    const pos = index - value
    const absPos = Math.abs(pos)
    return absPos < 0.5 ? -pos * (rotation * 2) : pos < 0 ? rotation : -rotation
  })

  const x = useTransform(scrollX, (value) => {
    const pos = index - value
    const absPos = Math.abs(pos)
    if (absPos < 1) return pos * centerGap
    return pos < 0
      ? -centerGap - (absPos - 1) * stackSpacing
      : centerGap + (absPos - 1) * stackSpacing
  })

  const z = useTransform(scrollX, (value) => {
    if (reduceMotion) return 0
    const absPos = Math.abs(index - value)
    return absPos > 0.5 ? -200 : absPos * -400
  })

  const zIndex = useTransform(scrollX, (value) => 1000 - Math.abs(index - value) * 10)

  const filterStyle = useTransform(
    scrollX,
    (value) => `brightness(${Math.abs(index - value) < 0.5 ? 1 : 0.5})`,
  )

  const imageRenderer = renderImage ?? defaultRenderImage
  const cursorClass = isActive || enableClickToSnap ? 'cursor-pointer' : 'cursor-grab'

  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 preserve-3d will-change-transform group-[.is-dragging]/cf:!cursor-grabbing ${cursorClass}`}
      style={{
        width,
        height,
        marginTop: -height / 2,
        marginLeft: -width / 2,
        x,
        z,
        rotateY,
        zIndex,
        filter: filterStyle,
        pointerEvents: 'auto',
      }}
      onClick={() => onCardClick(item, index)}
    >
      <div className="relative w-full h-full rounded-xl shadow-2xl bg-black">
        <div className="absolute inset-0 rounded-xl border border-white/10 z-20 pointer-events-none" />
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          {imageRenderer({
            src: item.image,
            alt: item.title,
            width,
            height,
            className: 'object-cover select-none pointer-events-none w-full h-full',
            draggable: false,
            sizes: `${width}px`,
            priority: isActive,
            loading: isActive ? 'eager' : 'lazy',
          })}
          <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 dark:opacity-20 pointer-events-none z-10" />
        </div>
      </div>

      {showReflection && (
        <div
          aria-hidden="true"
          className="absolute left-0 pointer-events-none overflow-hidden"
          style={{
            top: '100%',
            width,
            height: height * 0.42,
            marginTop: 1,
            transformOrigin: 'top center',
            transform: 'rotateX(12deg) translateZ(0)',
            willChange: 'transform',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: 'scaleY(-1)',
              filter: reflectionFilterId ? `url(#${reflectionFilterId})` : undefined,
              mixBlendMode: reflectionFilterId ? 'screen' : undefined,
              opacity: reflectionFilterId ? 0.55 : 0.4,
            }}
          >
            <div className={`relative w-full h-full rounded-xl bg-black ${reflectionFilterId ? 'shadow-2xl' : ''}`}>
              <div className="absolute inset-0 rounded-xl border border-white/10 z-20 pointer-events-none" />
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                {imageRenderer({
                  src: item.image,
                  alt: '',
                  width,
                  height,
                  className: 'object-cover w-full h-full',
                  draggable: false,
                  sizes: `${width}px`,
                  loading: 'lazy',
                })}
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.7) 40%, transparent 100%)',
            }}
          />
        </div>
      )}
    </motion.div>
  )
})
