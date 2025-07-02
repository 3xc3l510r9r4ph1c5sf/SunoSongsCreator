import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Sparkles, Download, Settings, Volume2 } from 'lucide-react';
import { SongGenerator } from './components/SongGenerator';
import { BentoGrid } from './components/BentoGrid';
import { DiagonalHero } from './components/DiagonalHero';
import { AnimatedText } from './components/AnimatedText';
import { GeometricBackground } from './components/GeometricBackground';
import { AudioPlayer } from './components/AudioPlayer';

function App() {
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  // Demo song for the preview player
  const demoSong = {
    title: "Cyber Dreams",
    artist: "AI Generated",
    url: "https://www.soundjay.com/misc/sounds/magic-chime-02.wav"
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <GeometricBackground />
      
      {/* Diagonal Hero Section */}
      <DiagonalHero />
      
      {/* Main Content Grid */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-16"
        >
          <AnimatedText
            text="CREATE MUSIC WITH AI"
            className="text-4xl md:text-6xl font-orbitron font-black mb-6"
            type="shimmer"
          />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Generate high-quality songs using Suno AI's advanced music generation technology
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <BentoGrid>
          {/* Song Generator - Main Feature */}
          <div className="col-span-2 row-span-2">
            <SongGenerator />
          </div>
          
          {/* Stats Cards */}
          <motion.div 
            className="geometric-card p-6 text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-3xl font-bold text-cyber-purple mb-2">10K+</div>
            <div className="text-gray-400">Songs Generated</div>
          </motion.div>
          
          <motion.div 
            className="geometric-card p-6 text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-3xl font-bold text-cyber-pink mb-2">50+</div>
            <div className="text-gray-400">Music Genres</div>
          </motion.div>
          
          {/* Feature Highlights */}
          <motion.div 
            className="geometric-card p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-8 h-8 text-cyber-cyan mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-400 text-sm">Advanced neural networks create unique compositions</p>
          </motion.div>
          
          <motion.div 
            className="geometric-card p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Download className="w-8 h-8 text-bauhaus-yellow mb-4" />
            <h3 className="text-lg font-semibold mb-2">High Quality</h3>
            <p className="text-gray-400 text-sm">Professional-grade audio output ready for download</p>
          </motion.div>
          
          {/* Music Player Preview */}
          <motion.div 
            className="col-span-2 geometric-card p-6"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Demo Player</h3>
              <Volume2 className="w-5 h-5 text-gray-400" />
            </div>
            
            <AudioPlayer
              src={demoSong.url}
              title={demoSong.title}
              artist={demoSong.artist}
            />
            
            <div className="mt-4 text-sm text-gray-400">
              <p>Experience the audio player with full playback controls and download functionality.</p>
            </div>
          </motion.div>
        </BentoGrid>

        {/* Integration Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="geometric-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-orbitron font-bold mb-4">Ready for Suno API Integration</h3>
            <p className="text-gray-300 mb-6">
              This webapp is designed to work with the Suno AI API. To enable real music generation:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-cyber-purple font-semibold mb-2">1. Backend Setup</div>
                <p className="text-sm text-gray-400">Set up a Node.js/Python backend with the Suno API integration</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-cyber-pink font-semibold mb-2">2. API Connection</div>
                <p className="text-sm text-gray-400">Connect the frontend to your backend API endpoints</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-cyber-cyan font-semibold mb-2">3. Authentication</div>
                <p className="text-sm text-gray-400">Add your Suno cookie/credentials to the backend</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Powered by Suno AI • Built with React & Framer Motion
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;