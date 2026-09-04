import { Reservation } from "@/components/nova/Reservation";
import { Gallery } from "@/components/nova/Gallery";
import { Menu } from "@/components/nova/Menu";
import { Navbar } from "@/components/nova/Navbar";
import { Hero } from "@/components/nova/Hero";
import { Story } from "@/components/nova/Story";
import Nova3D from "@/components/nova-3d";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      {/* NOVA 3D EXPERIENCE */}
      <section className="relative overflow-hidden bg-nova-espresso py-20 sm:py-28 lg:py-32">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300/[0.07] blur-[140px]" />

        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-8 lg:grid-cols-[0.55fr_1.45fr]">
            
            {/* Editorial text */}
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-orange-300" />

                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-orange-200">
                  01 — The Experience
                </span>
              </div>

              <h2 className="mt-7 max-w-xl font-display text-5xl leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                An evening
                <br />
                <em className="font-normal text-orange-200">
                  beyond dining.
                </em>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-white/40">
                At NOVA, every detail is designed to slow the evening down.
                From the first pour to the final course, experience dining
                shaped by atmosphere, craft, and conversation.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-200" />

                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/30">
                  Interactive dining atmosphere
                </span>
              </div>
            </div>

            {/* 3D centerpiece */}
            <div className="relative -my-10 lg:-my-20">
              <Nova3D />
            </div>
          </div>
        </div>
      </section>

      <Story />
      <Menu />
      <Gallery />
      <Reservation />
    </main>
  );
}