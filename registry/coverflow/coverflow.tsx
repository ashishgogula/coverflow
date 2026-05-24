import { memo, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
  type MotionValue,
} from 'motion/react'

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
  scrollThreshold?: number
  className?: string
  onItemClick?: (item: CoverFlowItem, index: number) => void
  onIndexChange?: (index: number) => void
  renderImage?: (props: RenderImageProps) => ReactNode
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
  scrollThreshold = 100,
  className,
  onItemClick,
  onIndexChange,
  renderImage,
}: CoverFlowProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const enableScrollRef = useRef(enableScroll)
  const scrollThresholdRef = useRef(scrollThreshold)
  const scrollX = useMotionValue(initialIndex)
  const springX = useSpring(scrollX, {
    stiffness: 150,
    damping: 30,
    mass: 1,
  })

  useEffect(() => {
    enableScrollRef.current = enableScroll
  }, [enableScroll])

  useEffect(() => {
    scrollThresholdRef.current = scrollThreshold
  }, [scrollThreshold])

  const activeIndexRef = useRef(activeIndex)
  activeIndexRef.current = activeIndex
  useEffect(() => {
    if (initialIndex !== activeIndexRef.current) {
      setActiveIndex(initialIndex)
      scrollX.set(initialIndex)
    }
  }, [initialIndex, scrollX])

  useEffect(() => {
    onIndexChange?.(activeIndex)
  }, [activeIndex, onIndexChange])

  const jumpToIndex = useCallback(
    (index: number) => {
      const clamped = Math.min(Math.max(index, 0), items.length - 1)
      setActiveIndex(clamped)
      scrollX.set(clamped)
    },
    [items.length, scrollX],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let wheelAccumulator = 0
    let lastWheelTime = Date.now()

    const handleWheel = (e: WheelEvent) => {
      if (!enableScrollRef.current) return
      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX)
      if (isVerticalScroll) return

      e.preventDefault()

      const now = Date.now()
      if (now - lastWheelTime > 200) wheelAccumulator = 0
      lastWheelTime = now
      wheelAccumulator += e.deltaX

      const threshold = scrollThresholdRef.current
      if (wheelAccumulator > threshold) {
        jumpToIndex(Math.round(scrollX.get()) + 1)
        wheelAccumulator = 0
      } else if (wheelAccumulator < -threshold) {
        jumpToIndex(Math.round(scrollX.get()) - 1)
        wheelAccumulator = 0
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [jumpToIndex, scrollX])

  const onDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const onDrag = useCallback(
    (_event: unknown, info: PanInfo) => {
      scrollX.set(springX.get() + -info.delta.x / (centerGap * 0.8))
    },
    [centerGap, scrollX, springX],
  )

  const onDragEnd = useCallback(
    (_event: unknown, info: PanInfo) => {
      setIsDragging(false)
      const projected = springX.get() - info.velocity.x * 0.002
      const clamped = Math.min(
        Math.max(Math.round(projected), 0),
        items.length - 1,
      )
      setActiveIndex(clamped)
      scrollX.set(clamped)
    },
    [items.length, scrollX, springX],
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        jumpToIndex(activeIndex - 1)
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        jumpToIndex(activeIndex + 1)
      }
    },
    [activeIndex, jumpToIndex],
  )

  const clickHandlers = useMemo(
    () =>
      items.map((item, index) => () => {
        if (index === activeIndex) {
          onItemClick?.(item, index)
        } else if (enableClickToSnap) {
          jumpToIndex(index)
        }
      }),
    [items, activeIndex, enableClickToSnap, jumpToIndex, onItemClick],
  )

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full h-full flex flex-col justify-center items-center overflow-hidden bg-transparent focus:outline-none touch-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
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
            scrollX={springX}
            width={itemWidth}
            height={itemHeight}
            stackSpacing={stackSpacing}
            centerGap={centerGap}
            rotation={rotation}
            isActive={index === activeIndex}
            enableReflection={enableReflection}
            enableClickToSnap={enableClickToSnap}
            isDragging={isDragging}
            renderImage={renderImage}
            onClick={clickHandlers[index]}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-40 transition-opacity duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
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
  enableReflection: boolean
  enableClickToSnap: boolean
  isDragging: boolean
  renderImage?: (props: RenderImageProps) => ReactNode
  onClick: () => void
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
  enableReflection,
  enableClickToSnap,
  isDragging,
  renderImage,
  onClick,
}: CardProps) {
  const rotateY = useTransform(scrollX, (value) => {
    const pos = index - value
    const absPos = Math.abs(pos)
    if (absPos < 0.5) return -pos * (rotation * 2)
    return pos < 0 ? rotation : -rotation
  })

  const x = useTransform(scrollX, (value) => {
    const pos = index - value
    const absPos = Math.abs(pos)
    if (absPos < 1) return pos * centerGap
    const stackIndex = absPos - 1
    return pos < 0
      ? -centerGap - stackIndex * stackSpacing
      : centerGap + stackIndex * stackSpacing
  })

  const z = useTransform(scrollX, (value) => {
    const pos = index - value
    const absPos = Math.abs(pos)
    return absPos > 0.5 ? -200 : absPos * -400
  })

  const zIndex = useTransform(scrollX, (value) =>
    1000 - Math.abs(index - value) * 10,
  )

  const filterStyle = useTransform(
    scrollX,
    (value) => `brightness(${Math.abs(index - value) < 0.5 ? 1 : 0.5})`,
  )

  const defaultRenderImage = useCallback(
    (props: RenderImageProps) => (
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
    ),
    [],
  )

  const imageRenderer = renderImage ?? defaultRenderImage

  const cursorClass = useMemo(() => {
    if (isDragging) return 'cursor-grabbing'
    if (isActive || enableClickToSnap) return 'cursor-pointer'
    return 'cursor-grab'
  }, [isDragging, isActive, enableClickToSnap])

  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 preserve-3d will-change-transform ${cursorClass}`}
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
      onClick={onClick}
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

      {enableReflection && (
        <div
          className="absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{ top: '100%', width, height: height * 0.35, marginTop: '2px' }}
        >
          <div
            className="relative w-full h-full opacity-40"
            style={{ transform: 'scaleY(-1)' }}
          >
            {imageRenderer({
              src: item.image,
              alt: '',
              width,
              height,
              className: 'object-cover blur-[1px] w-full h-full',
              draggable: false,
              sizes: `${width}px`,
              loading: 'lazy',
            })}
            <div className="absolute inset-0 bg-linear-to-b from-background/90 to-transparent" />
          </div>
        </div>
      )}
    </motion.div>
  )
})
