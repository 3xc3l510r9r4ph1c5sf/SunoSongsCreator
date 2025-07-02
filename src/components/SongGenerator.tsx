import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Sparkles, Loader, Settings, AlertCircle } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';

interface SongData {
  id: string;
  title: string;
  genre: string;
  duration: string;
  url: string;
  lyrics?: string;
}

export const SongGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSongs, setGeneratedSongs] = useState<SongData[]>([]);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customTags, setCustomTags] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Sample audio URLs for demonstration (replace with actual Suno API integration)
  const sampleAudioUrls = [
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav',
    'https://www.soundjay.com/misc/sounds/magic-chime-02.wav'
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // Simulate API call - In real implementation, this would call the Suno API
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const randomAudioUrl = sampleAudioUrls[Math.floor(Math.random() * sampleAudioUrls.length)];
      
      const newSong: SongData = {
        id: Date.now().toString(),
        title: customTitle || `AI Song ${generatedSongs.length + 1}`,
        genre: customTags || 'Electronic',
        duration: '3:42',
        url: randomAudioUrl,
        lyrics: isCustomMode ? prompt : undefined
      };
      
      setGeneratedSongs(prev => [newSong, ...prev]);
      setPrompt('');
      setCustomTitle('');
      setCustomTags('');
    } catch (err) {
      setError('Failed to generate song. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (song: SongData) => {
    // Create a download link
    const link = document.createElement('a');
    link.href = song.url;
    link.download = `${song.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="geometric-card p-8 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-orbitron font-bold">Song Generator</h2>
        <button
          onClick={() => setIsCustomMode(!isCustomMode)}
          className={`p-2 rounded-lg transition-colors ${
            isCustomMode 
              ? 'bg-cyber-purple text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            {isCustomMode ? 'Lyrics/Description' : 'Song Prompt'}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              setError(null);
            }}
            placeholder={isCustomMode 
              ? "Enter your custom lyrics or detailed description..." 
              : "Describe the song you want to create..."
            }
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyber-purple focus:outline-none resize-none"
            rows={4}
          />
        </div>

        <AnimatePresence>
          {isCustomMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Song title (optional)"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyber-purple focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Genre/Tags</label>
                <input
                  type="text"
                  value={customTags}
                  onChange={(e) => setCustomTags(e.target.value)}
                  placeholder="e.g., Electronic, Pop, Rock"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyber-purple focus:outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        <motion.button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-cyber-purple to-cyber-pink p-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyber-purple/25 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader className="w-5 h-5 animate-spin" />
              <span>Generating...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Generate Song</span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Generated Songs List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {generatedSongs.map((song) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyber-purple to-cyber-pink rounded-lg flex items-center justify-center">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium">{song.title}</div>
                    <div className="text-sm text-gray-400">{song.genre}</div>
                  </div>
                </div>
              </div>
              
              <AudioPlayer
                src={song.url}
                title={song.title}
                artist={`AI Generated • ${song.genre}`}
                onDownload={() => handleDownload(song)}
              />
              
              {song.lyrics && (
                <details className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <summary className="cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
                    View Lyrics
                  </summary>
                  <div className="mt-2 text-sm text-gray-400 whitespace-pre-wrap">
                    {song.lyrics}
                  </div>
                </details>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {generatedSongs.length === 0 && !isGenerating && (
        <div className="text-center text-gray-400 py-8">
          <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No songs generated yet. Create your first AI song!</p>
          <p className="text-sm mt-2">Note: This demo uses sample audio files. Integrate with Suno API for real music generation.</p>
        </div>
      )}
    </div>
  );
};