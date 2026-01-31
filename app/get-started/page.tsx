"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Github, Heart, Check, Copy } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/navbar";
import { CoverFlow, CoverFlowItem } from "@/components/coverflow";

const animeItems: CoverFlowItem[] = [
  { id: 1, image: "/anime/Obanai.jpeg", title: "Obanai Iguro" },
  { id: 2, image: "/anime/Shinobu.jpeg", title: "Shinobu Kocho" },
  { id: 3, image: "/anime/Tanjiro.jpeg", title: "Tanjiro Kamado" },
  { id: 4, image: "/anime/giyu.jpeg", title: "Giyu Tomioka" },
  { id: 5, image: "/anime/𝗦𝗵𝗶𝗻𝗮𝘇𝘂𝗴𝗮𝘄𝗮 ✩.jpeg", title: "Sanemi Shinazugawa" },
];

export default function GetStarted() {
  const [copied, setCopied] = useState(false);
  const installCommand = useMemo(() => "npx shadcn add coverflow", []);

  const copyCommand = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="m-shell">
      <Navbar />

      <main>
        <div className="m-wrap border-x border-dashed border-border min-h-screen relative">
            <div className="m-gridLines">
               <div className="m-gridLine" />
               <div className="m-gridLine" />
            </div>

            <section id="get-started" className="max-w-4xl mx-auto space-y-16 py-12 relative z-10 px-6">
               <div>
                  <h1 className="text-4xl font-semibold tracking-tight mb-8">Get Started</h1>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                     Install the component via CLI or copy the source code directly into your project.
                  </p>
               </div>

               <div className="space-y-8">
                  <h3 className="text-2xl font-medium tracking-tight">Installation</h3>
                  
                  <div className="space-y-4">
                     <div className="font-medium text-sm text-muted-foreground uppercase tracking-wider">CLI</div>
                     <div className="relative rounded-2xl border border-border/40 bg-secondary/30 p-4 font-mono text-sm backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                           <code>coming soon</code>
                           <button onClick={copyCommand} className="text-muted-foreground hover:text-foreground transition-colors">
                              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Manual</div>
                     <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
                        <p className="text-sm text-muted-foreground mb-4">
                           1. Install dependencies:
                        </p>
                        <div className="rounded-lg bg-secondary/50 p-3 font-mono text-xs mb-6">
                           npm install motion lucide-react
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                           2. Copy the component code into <code className="text-foreground bg-secondary/50 px-1 py-0.5 rounded">components/coverflow.tsx</code>
                        </p>
                        <Link 
                           href="https://github.com/your-repo/coverflow/blob/main/components/coverflow.tsx"
                           target="_blank"
                           className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                           View Source <Github className="h-3 w-3" />
                        </Link>
                     </div>
                  </div>
               </div>

               <div className="space-y-8">
                  <h3 className="text-2xl font-medium tracking-tight">Usage</h3>
                  <div className="rounded-2xl border border-border/40 bg-secondary/20 overflow-hidden shadow-sm">
                    <div className="h-[500px] w-full border-b border-border/40 relative bg-background">
                      <CoverFlow 
                        items={animeItems}
                        itemWidth={250}
                        itemHeight={250}
                        initialIndex={2}
                        enableReflection={true}
                      />
                    </div>
                    <div className="p-6 overflow-x-auto">
<pre className="text-sm font-mono text-muted-foreground leading-relaxed">
{`import { CoverFlow } from "@/components/coverflow";

const items = [
  { id: 1, image: "/Obanai.jpeg", title: "Obanai Iguro" },
  { id: 2, image: "/Shinobu.jpeg", title: "Shinobu Kocho" },
  { id: 3, image: "/Tanjiro.jpeg", title: "Tanjiro Kamado" },
  { id: 4, image: "/giyu.jpeg", title: "Giyu Tomioka" },
  { id: 5, image: "/Sanemi.jpeg", title: "Sanemi Shinazugawa" },
];

export function Demo() {
  return (
    <div className="h-[400px] w-full">
      <CoverFlow 
        items={items} 
        itemWidth={250} 
        itemHeight={250} 
      />
    </div>
  );
}`}
</pre>
                    </div>
                  </div>
               </div>

               <div className="space-y-8">
                  <h3 className="text-2xl font-medium tracking-tight">Props</h3>
                  <div className="overflow-hidden rounded-2xl border border-border/40 shadow-sm">
                     <table className="w-full text-left text-sm">
                        <thead className="bg-secondary/30 text-muted-foreground font-medium">
                           <tr>
                              <th className="p-4 font-medium">Prop</th>
                              <th className="p-4 font-medium">Type</th>
                              <th className="p-4 font-medium">Default</th>
                              <th className="p-4 font-medium">Description</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40 bg-card/50">
                           <tr className="group hover:bg-secondary/20 transition-colors">
                              <td className="p-4 font-mono text-foreground">items</td>
                              <td className="p-4 font-mono text-xs text-blue-500">CoverFlowItem[]</td>
                              <td className="p-4 font-mono text-xs text-muted-foreground">-</td>
                              <td className="p-4 text-muted-foreground">Array of items to display.</td>
                           </tr>
                           <tr className="group hover:bg-secondary/20 transition-colors">
                              <td className="p-4 font-mono text-foreground">itemWidth</td>
                              <td className="p-4 font-mono text-xs text-blue-500">number</td>
                              <td className="p-4 font-mono text-xs text-muted-foreground">400</td>
                              <td className="p-4 text-muted-foreground">Width of each card in pixels.</td>
                           </tr>
                           <tr className="group hover:bg-secondary/20 transition-colors">
                              <td className="p-4 font-mono text-foreground">itemHeight</td>
                              <td className="p-4 font-mono text-xs text-blue-500">number</td>
                              <td className="p-4 font-mono text-xs text-muted-foreground">400</td>
                              <td className="p-4 text-muted-foreground">Height of each card in pixels.</td>
                           </tr>
                           <tr className="group hover:bg-secondary/20 transition-colors">
                              <td className="p-4 font-mono text-foreground">stackSpacing</td>
                              <td className="p-4 font-mono text-xs text-blue-500">number</td>
                              <td className="p-4 font-mono text-xs text-muted-foreground">100</td>
                              <td className="p-4 text-muted-foreground">Spacing between stacked cards.</td>
                           </tr>
                           <tr className="group hover:bg-secondary/20 transition-colors">
                              <td className="p-4 font-mono text-foreground">centerGap</td>
                              <td className="p-4 font-mono text-xs text-blue-500">number</td>
                              <td className="p-4 font-mono text-xs text-muted-foreground">250</td>
                              <td className="p-4 text-muted-foreground">Gap between the center card and the stack.</td>
                           </tr>
                           <tr className="group hover:bg-secondary/20 transition-colors">
                              <td className="p-4 font-mono text-foreground">rotation</td>
                              <td className="p-4 font-mono text-xs text-blue-500">number</td>
                              <td className="p-4 font-mono text-xs text-muted-foreground">50</td>
                              <td className="p-4 text-muted-foreground">Rotation angle (in degrees) for stacked cards.</td>
                           </tr>
                           <tr className="group hover:bg-secondary/20 transition-colors">
                              <td className="p-4 font-mono text-foreground">initialIndex</td>
                              <td className="p-4 font-mono text-xs text-blue-500">number</td>
                              <td className="p-4 font-mono text-xs text-muted-foreground">0</td>
                              <td className="p-4 text-muted-foreground">Index of the initially selected item.</td>
                           </tr>
                           <tr className="group hover:bg-secondary/20 transition-colors">
                              <td className="p-4 font-mono text-foreground">enableReflection</td>
                              <td className="p-4 font-mono text-xs text-blue-500">boolean</td>
                              <td className="p-4 font-mono text-xs text-muted-foreground">true</td>
                              <td className="p-4 text-muted-foreground">Enable or disable reflection effect.</td>
                           </tr>
                           <tr className="group hover:bg-secondary/20 transition-colors">
                              <td className="p-4 font-mono text-foreground">onItemClick</td>
                              <td className="p-4 font-mono text-xs text-blue-500">function</td>
                              <td className="p-4 font-mono text-xs text-muted-foreground">-</td>
                              <td className="p-4 text-muted-foreground">Callback when an item is clicked.</td>
                           </tr>
                           <tr className="group hover:bg-secondary/20 transition-colors">
                              <td className="p-4 font-mono text-foreground">onIndexChange</td>
                              <td className="p-4 font-mono text-xs text-blue-500">function</td>
                              <td className="p-4 font-mono text-xs text-muted-foreground">-</td>
                              <td className="p-4 text-muted-foreground">Callback when the active index changes.</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </section>
        </div>
      </main>
    </div>
  );
}