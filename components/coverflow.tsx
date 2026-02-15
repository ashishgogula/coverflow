'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  PanInfo,
  MotionValue,
  useTransform,
} from 'motion/react'
import Image from 'next/image'

export interface CoverFlowItem {
  id: string | number
  image: string
  title: string
  subtitle?: string
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
    if (initialIndex !== activeIndex) {
      setActiveIndex(initialIndex)
      scrollX.set(initialIndex)
    }
  }, [initialIndex])

  useEffect(() => {
    onIndexChange?.(activeIndex)
  }, [activeIndex, onIndexChange])

  useEffect(() => {
    enableScrollRef.current = enableScroll
  }, [enableScroll])

  useEffect(() => {
    scrollThresholdRef.current = scrollThreshold
  }, [scrollThreshold])

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

      if (isVerticalScroll) {
        return
      }

      e.preventDefault()

      const now = Date.now()
      if (now - lastWheelTime > 200) {
        wheelAccumulator = 0
      }
      lastWheelTime = now

      wheelAccumulator += e.deltaX

      const threshold = scrollThresholdRef.current

      if (wheelAccumulator > threshold) {
        const currentIndex = Math.round(scrollX.get())
        jumpToIndex(currentIndex + 1)
        wheelAccumulator = 0
      } else if (wheelAccumulator < -threshold) {
        const currentIndex = Math.round(scrollX.get())
        jumpToIndex(currentIndex - 1)
        wheelAccumulator = 0
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [jumpToIndex, scrollX])

  const onDragStart = () => {
    setIsDragging(true)
  }

  const onDrag = (event: any, info: PanInfo) => {
    const deltaIndex = -info.delta.x / (centerGap * 0.8)
    const current = springX.get()
    scrollX.set(current + deltaIndex)
  }

  const onDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)
    const current = springX.get()
    const velocity = info.velocity.x
    const projected = current - velocity * 0.002
    const targetIndex = Math.round(projected)
    const clampedIndex = Math.min(Math.max(targetIndex, 0), items.length - 1)

    setActiveIndex(clampedIndex)
    scrollX.set(clampedIndex)
  }

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
            onClick={() => {
              if (index === activeIndex) {
                onItemClick?.(item, index)
              } else if (enableClickToSnap) {
                jumpToIndex(index)
              }
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-40 transition-opacity duration-300">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={activeIndex}
          transition={{ duration: 0.4, ease: 'easeOut' }}
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
  onClick: () => void
}

function CoverFlowItemCard({
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
  onClick,
}: CardProps) {
  const position = useTransform(scrollX, (value) => index - value)
  const zIndex = useTransform(position, (pos) => 1000 - Math.abs(pos) * 10)

  const t = useTransform(position, (pos) => {
    const absPos = Math.abs(pos)
    const isCenter = absPos < 0.5

    let rY = 0
    if (pos < -0.5) rY = rotation
    if (pos > 0.5) rY = -rotation
    if (isCenter) rY = -pos * (rotation * 2)

    let x = 0
    if (pos < 0) {
      const stackIndex = Math.max(0, absPos - 1)
      x = -centerGap - stackIndex * stackSpacing
      if (absPos < 1) x = pos * centerGap
    } else {
      const stackIndex = Math.max(0, absPos - 1)
      x = centerGap + stackIndex * stackSpacing
      if (absPos < 1) x = pos * centerGap
    }

    let z = 0
    if (absPos > 0.5) {
      z = -200
    } else {
      z = Math.abs(pos) * -400
    }

    return { rotateY: rY, x, z }
  })

  const rotateY = useTransform(t, (v) => v.rotateY)
  const x = useTransform(t, (v) => v.x)
  const z = useTransform(t, (v) => v.z)
  const brightness = useTransform(position, (pos) =>
    Math.abs(pos) < 0.5 ? 1 : 0.5,
  )

  const getCursorClass = () => {
    if (isDragging) return 'cursor-grabbing'
    if (isActive || enableClickToSnap) return 'cursor-pointer'
    return 'cursor-grab'
  }

  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 preserve-3d will-change-transform ${getCursorClass()}`}
      style={{
        width,
        height,
        marginTop: -height / 2,
        marginLeft: -width / 2,
        x,
        z,
        rotateY,
        zIndex,
        filter: useTransform(brightness, (b) => `brightness(${b})`),
        pointerEvents: 'auto',
      }}
      onClick={onClick}
    >
      <div className="relative w-full h-full rounded-xl shadow-2xl bg-black">
        <div className="absolute inset-0 rounded-xl border border-white/10 z-20 pointer-events-none" />
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover select-none pointer-events-none"
            draggable={false}
            sizes={`${width}px`}
            priority={isActive}
            quality={100}
          />
        </div>
      </div>

      {enableReflection && (
        <div
          className="absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{
            top: '100%',
            width: width,
            height: height * 0.35,
            marginTop: '2px',
          }}
        >
          <div
            className="relative w-full h-full opacity-40"
            style={{ transform: 'scaleY(-1)' }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover blur-[1px]"
              sizes={`${width}px`}
            />
            <div className="absolute inset-0 bg-linear-to-b from-background/90 to-transparent" />
          </div>
        </div>
      )}
    </motion.div>
  )
}
