import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../contexts/AppContext'
import { useAudioPlayer } from '../../hooks/useAudioPlayer'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Loader } from 'lucide-react'

const MusicPlayer = () => {
  const { currentTrack, isPlaying, setIsPlaying, setCurrentTrack } = useApp()
  const { audioRef, currentTime, duration, isLoading, play, pause, seek, setVolume } = useAudioPlayer()
  const [volume, setVolumeState] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)

  // Handle play/pause
  useEffect(() => {
    if (currentTrack) {
      if (isPlaying) {
        play()
      } else {
        pause()
      }
    }
  }, [isPlaying, currentTrack, play, pause])

  // Handle volume changes
  useEffect(() => {
    setVolume(isMuted ? 0 : volume)
  }, [volume, isMuted, setVolume])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    seek(newTime)
  }

  const formatTime = (seconds) => {
    if (!seconds) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolumeState(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  if (!currentTrack) {
    return null
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/api/audio-stream" // Placeholder - would be real audio source
        onEnded={() => setIsPlaying(false)}
      />
      
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 glass-card mx-4 mb-4 p-4 z-40"
        >
          {/* Main Player Content */}
          <div className="flex items-center justify-between gap-4">
            {/* Track Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                {isLoading ? (
                  <Loader className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <Volume2 className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold truncate">{currentTrack.title}</div>
                <div className="text-sm text-gray-400 truncate">{currentTrack.artist}</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {/* Previous track logic */}}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Previous track"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlayPause}
                className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors flex-shrink-0"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 text-white animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white ml-0.5" />
                )}
              </motion.button>

              <button
                onClick={() => {/* Next track logic */}}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Next track"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 flex-1 max-w-[120px]">
              <button
                onClick={toggleMute}
                className="p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>

            {/* Time Display */}
            <div className="text-sm text-gray-400 flex-shrink-0 min-w-[80px] text-right">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div 
              className="w-full bg-white/20 rounded-full h-1 cursor-pointer"
              onClick={handleSeek}
            >
              <motion.div
                className="bg-cyan-400 rounded-full h-1 relative"
                style={{ width: `${progressPercent}%` }}
                initial={{ width: '0%' }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.1 }}
              >
                <div className="w-3 h-3 bg-cyan-400 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default MusicPlayer