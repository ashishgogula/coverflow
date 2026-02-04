# Cover Flow
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Motion](https://img.shields.io/badge/Motion-React-purple)](https://motion.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue)](https://tailwindcss.com/)
[![npm downloads](https://img.shields.io/npm/dm/@ashishgogula/coverflow)](https://www.npmjs.com/package/@ashishgogula/coverflow)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live-black?logo=vercel)](https://coverflow.ashishgogula.in)


A high-fidelity recreation of the classic iTunes Cover Flow interaction, built for the modern web using React, Next.js, Tailwind and Motion.

![Cover Flow Preview](public/coverflow.png)
![Cover Flow Example](public/example.png)

## Overview

Cover Flow is a production-ready 3D carousel component that mimics the physical feel of the original Apple interface. It uses spring physics for fluid, interruptible motion and is built with a focus on performance (refresh-rate independent, buttery-smooth animations on modern displays), accessibility, and zero layout shifts.

Designed to be dropped into any React/Next.js application, it supports both mouse/touch interactions and keyboard navigation.

The component is fully client-side and does not rely on layout measurements, ensuring consistent behavior across SSR and client hydration.


## Features

- **Fluid Physics Engine**: Driven by `motion` springs. Motion is weighty, responsive, and fully interruptible.
- **3D Transforms**: Uses CSS 3D transforms with hardware acceleration for smooth, refresh-rate-independent performance.
- **Interactive**: Supports 1:1 touch/drag gestures with velocity-aware throwing and full keyboard navigation (Left/Right arrows).
- **shadcn/ui Compatible**: Designed to drop cleanly into shadcn-based projects via the CLI or manual install, following the same conventions and structure.
- **React & Next.js Ready**: Works seamlessly in modern React and Next.js environments, including App Router setups.
- **Responsive by Design**: Adapts gracefully to different container sizes and layouts.
- **Dark Mode Ready**: Built with Tailwind CSS and compatible with `next-themes`.
- **Zero Layout Shift**: Isolated component design prevents surrounding layout jitter.


## Installation

### CLI (Recommended)

You can install the component directly into your project using the shadcn CLI:

```bash
npx shadcn add https://coverflow.ashishgogula.in/r/coverflow.json
```

### Package Manager

Alternatively, you can install the primitive package:

```bash
npm install @ashishgogula/coverflow
# or
pnpm add @ashishgogula/coverflow
# or
yarn add @ashishgogula/coverflow
# or
bun add @ashishgogula/coverflow
```

### Manual Installation

1.  **Install dependencies**:

    ```bash
    npm install motion
    ```

2.  **Copy the code**:
    Copy the source code from [registry/coverflow/coverflow.tsx](https://github.com/ashishgogula/coverflow/blob/main/registry/coverflow/coverflow.tsx) into your project's component directory.

## Usage

Import the component and pass an array of items to display.

```tsx
import { CoverFlow, type CoverFlowItem } from "@/components/ui/coverflow";

const animeItems: CoverFlowItem[] = [
  { id: 1, image: "/anime/Shinazugawa.jpeg", title: "Sanemi Shinazugawa" },
  { id: 2, image: "/anime/Obanai.jpeg", title: "Obanai Iguro" },
  { id: 3, image: "/anime/Mitsuri.jpeg", title: "Mitsuri Kanroji" },
  { id: 4, image: "/anime/giyu.jpeg", title: "Giyu Tomioka" },
  { id: 5, image: "/anime/Shinobu.jpeg", title: "Shinobu Kocho" },
  { id: 6, image: "/anime/kanao.jpeg", title: "Kanao Tsuyuri" },
];

export default function CoverFlowDemo() {
  return (
    <div className="h-[400px] w-full border-b border-border/40 relative bg-background">
      <CoverFlow
        items={animeItems}
        itemWidth={250}
        itemHeight={250}
        initialIndex={2}
        enableReflection={true}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `CoverFlowItem[]` | Required | Array of items to display. Each item must have `id`, `image`, and `title`. |
| `itemWidth` | `number` | `400` | Width of each card in pixels. |
| `itemHeight` | `number` | `400` | Height of each card in pixels. |
| `stackSpacing` | `number` | `100` | Spacing between stacked cards (cards on the side). |
| `centerGap` | `number` | `250` | Gap between the center card and the side stacks. |
| `rotation` | `number` | `50` | Rotation angle (in degrees) for stacked cards. |
| `initialIndex` | `number` | `0` | The index of the item to show initially. |
| `enableReflection` | `boolean` | `false` | Whether to show the reflection effect below cards. |
| `onItemClick` | `(item: CoverFlowItem, index: number) => void` | - | Callback fired when the active item is clicked. |
| `onIndexChange` | `(index: number) => void` | - | Callback fired when the active index changes. |


## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Animation**: [Motion](https://motion.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Live Demo

[coverflow.ashishgogula.in](https://coverflow.ashishgogula.in)

## License

MIT © [Ashish Gogula](https://github.com/ashishgogula)
