import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900']
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "GRID X | 2045 Energy OS",
  description: "Next-generation P2P energy sharing platform with real-time AI optimization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${spaceGrotesk.variable} font-sans bg-[#02030A] text-gray-100 antialiased overflow-x-hidden selection:bg-[#00FFB2]/50 selection:text-white`}>
        {/* Deep Background Layer */}
        <div className="fixed inset-0 z-[-10] bg-[#02030A]" />
        
        {/* Massive Ambient Center Glows */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] bg-[#3BA5FF]/10 rounded-full blur-[150px] opacity-50 z-[-9] mix-blend-screen pointer-events-none" />
        <div className="fixed top-0 left-0 w-[50vw] h-[50vw] bg-[#00FFB2]/10 rounded-full blur-[120px] opacity-40 z-[-9] mix-blend-screen pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-[60vw] h-[60vw] bg-[#FF3D6E]/5 rounded-full blur-[150px] opacity-30 z-[-9] mix-blend-screen pointer-events-none" />
        
        {/* Animated Holographic Rings */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] max-w-[2000px] max-h-[2000px] z-[-8] pointer-events-none opacity-20 mix-blend-screen perspective-1000">
          <div className="absolute inset-0 rounded-full border-[1px] border-[#3BA5FF]/30 animate-spin-slow-1 shadow-[0_0_50px_rgba(59,165,255,0.2)]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(70deg) rotateY(10deg)' }}></div>
          <div className="absolute inset-10 rounded-full border-[2px] border-[#00FFB2]/20 border-dashed animate-spin-slow-2 shadow-[0_0_30px_rgba(0,255,178,0.2)]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(65deg) rotateY(-10deg)' }}></div>
          <div className="absolute inset-20 rounded-full border-[1px] border-[#E7FF43]/10 animate-spin-slow-3" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(75deg) rotateY(5deg)' }}></div>
        </div>

        {/* Vertical Data Streams (Matrix-like) */}
        <div className="fixed inset-0 z-[-7] opacity-20 pointer-events-none bg-[url('/data-stream-pattern.png')] animate-data-stream mix-blend-overlay" />

        {/* Digital Grid Overlay - Heavy Bloom */}
        <div className="fixed inset-0 z-[-6] opacity-[0.05] pointer-events-none bg-grid mix-blend-screen shadow-[inset_0_0_100px_rgba(0,255,178,0.5)]" />
        
        {/* Intense Noise Texture */}
        <div className="fixed inset-0 z-[-5] opacity-[0.03] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        {/* Moving Scanline Overlay */}
        <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 1) 50%)', backgroundSize: '100% 4px' }} />
        <div className="fixed inset-0 z-[101] pointer-events-none opacity-20 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,255,178,0.05)_10%,transparent_100%)] animate-scanline h-[20vh] w-full mix-blend-screen" />

        <div className="min-h-screen relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
