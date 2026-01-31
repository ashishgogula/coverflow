"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  PanInfo,
  MotionValue,
} from "motion/react";
import Image from "next/image";

export interface CoverFlowItem {
  id: string | number;
  image: string;
  title: string;
  subtitle?: string;
}

export interface CoverFlowProps {
  items: CoverFlowItem[];
  itemWidth?: number;
  itemHeight?: number;
  stackSpacing?: number;
  centerGap?: number;
  rotation?: number;
  initialIndex?: number;
  className?: string;
  onItemClick?: (item: CoverFlowItem, index: number) => void;
  onIndexChange?: (index: number) => void;
}

export function CoverFlow({
  items,
  itemWidth = 400,
  itemHeight = 400,
  stackSpacing = 100,
  centerGap = 250,
  rotation = 50,
  initialIndex = 0,
  className,
  onItemClick,
  onIndexChange,
}: CoverFlowProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollX = useMotionValue(initialIndex);

  const springX = useSpring(scrollX, {
    stiffness: 150,
    damping: 30,
    mass: 1,
  });

  useEffect(() => {
    onIndexChange?.(activeIndex);
  }, [activeIndex, onIndexChange]);

  useEffect(() => {
    scrollX.set(activeIndex);
  }, [activeIndex, scrollX]);

  const jumpToIndex = useCallback((index: number) => {
    const clamped = Math.min(Math.max(index, 0), items.length - 1);
    setActiveIndex(clamped);
  }, [items.length]);


  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        jumpToIndex(activeIndex - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        jumpToIndex(activeIndex + 1);
      }
    },
    [activeIndex, jumpToIndex]
  );

  const onDrag = (event: any, info: PanInfo) => {
    const deltaIndex = -info.delta.x / (centerGap * 0.8);

    const current = springX.get();
    scrollX.set(current + deltaIndex);
  };

  const onDragEnd = (event: any, info: PanInfo) => {
    const current = springX.get();
    const velocity = info.velocity.x;

    const projected = current - velocity * 0.002;

    const targetIndex = Math.round(projected);
    const clampedIndex = Math.min(Math.max(targetIndex, 0), items.length - 1);

    setActiveIndex(clampedIndex);
  };

  return (
    <div
      ref={containerRef}
      className={
        "relative w-full h-full flex flex-col justify-center items-center overflow-hidden bg-transparent perspective-1000 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 " +
        (className ?? "")
      }
      role="region"
      aria-label="Cover Flow"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <motion.div
        className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing touch-none"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ opacity: 0 }}
      />

      <div className="relative w-full h-full flex items-center justify-center preserve-3d">
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
            onClick={() => {
              if (index === activeIndex) {
                onItemClick?.(item, index);
              } else {
                jumpToIndex(index);
              }
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-40 transition-opacity duration-300">
         <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
                opacity: 1, 
                y: 0,
            }}
            key={activeIndex}
            transition={{ duration: 0.4, ease: "easeOut" }}
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
    </div>
  );
}
interface CardProps {
  item: CoverFlowItem;
  index: number;
  scrollX: MotionValue<number>;
  width: number;
  height: number;
  stackSpacing: number;
  centerGap: number;
  rotation: number;
  isActive: boolean;
  onClick: () => void;
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
  onClick,
}: CardProps) {
  const position = useTransform(scrollX, (value) => {
    return index - value;
  });

  const zIndex = useTransform(position, (pos) => {
    return 1000 - Math.abs(pos) * 10;
  });

  const t = useTransform(position, (pos) => {
    const absPos = Math.abs(pos);
    const isCenter = absPos < 0.5;
    
    let rY = 0;
    if (pos < -0.5) rY = rotation;
    if (pos > 0.5) rY = -rotation;
    
    if (!isCenter) {
    } else {
        rY = -pos * (rotation * 2);
    }

    let x = 0;
    if (pos < 0) {
        const stackIndex = Math.max(0, absPos - 1);
        x = -centerGap - stackIndex * stackSpacing;
        
        if (absPos < 1) {
            x = pos * centerGap;
        }
    } else {
        const stackIndex = Math.max(0, absPos - 1);
        x = centerGap + stackIndex * stackSpacing;
        
        if (absPos < 1) {
            x = pos * centerGap;
        }
    }

    let z = 0;
    if (absPos > 0.5) {
        z = -200;
    } else {
        z = Math.abs(pos) * -400;
    }

    return {
        rotateY: rY,
        x,
        z,
    };
  });
  
  const rotateY = useTransform(t, (v) => v.rotateY);
  const x = useTransform(t, (v) => v.x);
  const z = useTransform(t, (v) => v.z);

  const brightness = useTransform(position, (pos) => {
    const absPos = Math.abs(pos);
    if (absPos < 0.5) return 1;
    return 0.5;
  });

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 preserve-3d will-change-transform"
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
      }}
      onClick={onClick}
    >
      <div className="relative w-full h-full rounded-xl shadow-2xl bg-black">
         {/* Glass highlight on edges */}
         <div className="absolute inset-0 rounded-xl border border-white/10 z-20 pointer-events-none" />
         
         <div className="relative w-full h-full overflow-hidden rounded-xl">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover select-none pointer-events-none"
              draggable={false}
              sizes={`${width}px`}
              priority={Math.abs(index - scrollX.get()) < 2}
              quality={95}
            />
            {/* Subtle gloss gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 dark:opacity-20 pointer-events-none z-10" />
         </div>
      </div>

      <div 
        className="absolute top-full left-0 right-0 h-full overflow-hidden pointer-events-none"
        style={{ transform: "scaleY(-1) translateY(0px)", transformOrigin: "top" }}
      >
         <div className="relative w-full h-full opacity-40">
             <Image 
                src={item.image} 
                alt="" 
                fill
                className="object-cover blur-[1px]"
                sizes={`${width}px`}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
         </div>
      </div>
    </motion.div>
  );
}
