/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  History, 
  Palette, 
  Settings, 
  MapPin, 
  ChevronDown, 
  Info,
  Loader2,
  Sparkles
} from 'lucide-react';
import { cn } from './lib/utils';
import { researchBatikRifaiyah } from './services/researchService';

// --- Types ---
interface BatikSection {
  title: string;
  content: string;
  icon: React.ReactNode;
  image: string;
}

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-amber-800 rounded-full flex items-center justify-center">
          <span className="text-white font-serif font-bold">R</span>
        </div>
        <span className="font-serif text-xl font-bold tracking-tight text-stone-900">Batik Rifaiyah</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
        <a href="#sejarah" className="hover:text-amber-800 transition-colors">Sejarah</a>
        <a href="#filosofi" className="hover:text-amber-800 transition-colors">Filosofi</a>
        <a href="#motif" className="hover:text-amber-800 transition-colors">Motif</a>
        <a href="#proses" className="hover:text-amber-800 transition-colors">Proses</a>
      </div>
    </div>
  </nav>
);

const Section = ({ title, content, icon, image, id, reverse = false }: BatikSection & { id: string, reverse?: boolean }) => (
  <section id={id} className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
    <div className={cn(
      "flex flex-col lg:flex-row items-center gap-12",
      reverse && "lg:flex-row-reverse"
    )}>
      <motion.div 
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
          {icon}
          <span>{title}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
          {title}
        </h2>
        <div className="prose prose-stone prose-lg max-w-none text-stone-600 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group"
      >
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </div>
  </section>
);

export default function App() {
  const [researchData, setResearchData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await researchBatikRifaiyah();
      setResearchData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-4"
        >
          <Loader2 className="w-12 h-12 text-amber-800" />
        </motion.div>
        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Menelusuri Jejak Batik Rifaiyah</h2>
        <p className="text-stone-500 max-w-md">Gemini sedang meriset data terbaru tentang warisan budaya Kalipucang Wetan...</p>
      </div>
    );
  }

  // Parse the research data into sections
  // We look for common headers or numbering
  const parseSections = (text: string | null) => {
    if (!text) return [];
    // Split by numbered list 1. 2. etc or double newlines with headers
    const parts = text.split(/(?:\n|^)\d\.\s+/).filter(s => s.trim().length > 0);
    if (parts.length < 5) {
      // Fallback: try splitting by double newlines if numbering fails
      return text.split(/\n\n+/).filter(s => s.trim().length > 50).slice(0, 5);
    }
    return parts;
  };

  const sections = parseSections(researchData);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      <Navbar />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/batik-pattern/1920/1080?blur=2" 
            alt="Batik Background"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/0 via-stone-50/50 to-stone-50" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 bg-amber-800 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full">
              Warisan Budaya Batang
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-stone-900 mb-6 leading-[0.9]">
              Batik <br />
              <span className="text-amber-800 italic">Rifaiyah</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Harmoni antara seni, religi, dan tradisi dari Desa Kalipucang Wetan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-stone-400 animate-bounce" />
          </motion.div>
        </div>
      </header>

      {/* Content Sections */}
      <div className="relative z-10 bg-stone-50">
        {sections.length > 0 ? (
          <>
            <Section 
              id="sejarah"
              title="Sejarah & Asal-usul"
              content={sections[0]}
              icon={<History className="w-3 h-3" />}
              image="https://picsum.photos/seed/history-batik/800/600"
            />
            <Section 
              id="filosofi"
              title="Karakteristik & Filosofi"
              content={sections[1]}
              icon={<Info className="w-3 h-3" />}
              image="https://picsum.photos/seed/philosophy-batik/800/600"
              reverse
            />
            <Section 
              id="motif"
              title="Motif-Motif Utama"
              content={sections[2]}
              icon={<Palette className="w-3 h-3" />}
              image="https://picsum.photos/seed/motif-batik/800/600"
            />
            <Section 
              id="proses"
              title="Proses Pembuatan"
              content={sections[3]}
              icon={<Settings className="w-3 h-3" />}
              image="https://picsum.photos/seed/process-batik/800/600"
              reverse
            />
            <Section 
              id="kondisi"
              title="Kalipucang Wetan Saat Ini"
              content={sections[4]}
              icon={<MapPin className="w-3 h-3" />}
              image="https://picsum.photos/seed/village-batik/800/600"
            />
          </>
        ) : (
          <div className="py-24 text-center">
            <p className="text-stone-400 italic">Data riset tidak tersedia. Silakan coba muat ulang.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold">R</span>
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">Batik Rifaiyah</span>
            </div>
            <p className="text-sm leading-relaxed">
              Melestarikan warisan KH Ahmad Rifa'i melalui goresan canting dan lantunan sholawat.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-widest">Navigasi</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#sejarah" className="hover:text-amber-500 transition-colors">Sejarah</a></li>
              <li><a href="#filosofi" className="hover:text-amber-500 transition-colors">Filosofi</a></li>
              <li><a href="#motif" className="hover:text-amber-500 transition-colors">Motif</a></li>
              <li><a href="#proses" className="hover:text-amber-500 transition-colors">Proses</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-widest">Tentang Proyek</h4>
            <p className="text-sm">
              Website ini dibuat untuk meriset dan mendokumentasikan keunikan Batik Rifaiyah sebagai bagian dari kekayaan budaya Indonesia.
            </p>
            <div className="flex items-center gap-2 text-amber-500 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Didukung oleh Google Gemini Search</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 text-center text-xs">
          <p>&copy; 2026 Batik Rifaiyah Kalipucang Wetan. Dibuat dengan dedikasi untuk budaya.</p>
        </div>
      </footer>
    </div>
  );
}
