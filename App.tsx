
import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { GestureController } from './components/GestureController';
import { TransformState } from './types';

// --- Music Player ---
const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio('https://ia800501.us.archive.org/11/items/pachelbel/Pachelbel%20Canon%20in%20D%20Major.mp3');
        audio.loop = true;
        audio.volume = 0.4; 
        audioRef.current = audio;

        const handleInteraction = () => {
            if (audio.paused) {
                audio.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => {});
            }
            window.removeEventListener('click', handleInteraction);
        };
        window.addEventListener('click', handleInteraction);
        return () => {
            audio.pause();
            audioRef.current = null;
            window.removeEventListener('click', handleInteraction);
        };
    }, []);

    return (
        <button 
            onClick={() => {
                if(isPlaying) audioRef.current?.pause();
                else audioRef.current?.play();
                setIsPlaying(!isPlaying);
            }}
            className={`fixed top-8 right-8 z-50 flex items-center gap-3 px-5 py-2 rounded-full border transition-all duration-700 font-display tracking-widest text-xs
                ${isPlaying ? 'bg-black/40 border-rose-600/50 text-rose-100' : 'bg-transparent border-white/10 text-white/40'}`}
        >
            {isPlaying ? "PAUSE SYMPHONY" : "PLAY SYMPHONY"}
        </button>
    );
};

const Overlay = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-between py-12">
            
            {/* Header */}
            <div className="text-center mt-4">
                <h1 className="font-script text-6xl md:text-8xl liquid-gold-text drop-shadow-2xl opacity-95">
                    Eternal Love
                </h1>
                <h2 className="font-display text-white/90 text-lg md:text-xl tracking-[0.4em] mt-2 uppercase">
                    Happy Valentine's, Minmin
                </h2>
                <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent mx-auto mt-6" />
            </div>

            {/* Footer Instructions */}
            <div className="flex flex-col items-center gap-2 mb-8 bg-black/10 backdrop-blur-sm p-4 rounded-3xl">
                 <p className="font-deco text-[10px] text-rose-500/70 tracking-[0.2em] uppercase">
                    Interactive Sensory Experience
                 </p>
                 <div className="flex flex-wrap justify-center gap-4 text-[9px] text-white/50 font-display tracking-widest px-4 text-center">
                     <span>OPEN PALM: BLOSSOM GALLERY</span>
                     <span>TWO PALMS: ZOOM LENS</span>
                     <span>ROTATE HAND: SPIN THE WORLD</span>
                     <span>FIST: FORM THE TREE</span>
                 </div>
            </div>
        </div>
    );
};

export default function App() {
  const transformRef = useRef<TransformState>({
    rotationY: 0,
    autoRotationSpeed: 0,
    position: [0, -0.5, 0],
    scale: 1,
    galleryOffset: 0, 
    handPosition: [0.5, 0.5],
    treeState: 'FORMED',
    chaosFactor: 0,
    focusedPhotoIndex: null
  });

  return (
    <div className="relative w-full h-screen bg-[#050001] text-white overflow-hidden">
      <MusicPlayer />
      <Overlay />
      
      <GestureController transformRef={transformRef} />

      <Canvas 
        shadows 
        dpr={[1, 1.5]} 
        gl={{ 
            antialias: false, 
            toneMappingExposure: 1.1,
            powerPreference: "high-performance"
        }}
      >
        <Scene transformRef={transformRef} />
      </Canvas>
    </div>
  );
}
