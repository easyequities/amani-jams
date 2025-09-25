import { useState, useRef, useEffect } from 'react'

export const useAudioPlayer = () => {
  const audioRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  const play = () => {
    audioRef.current?.play()
  }

  const pause = () => {
    audioRef.current?.pause()
  }

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const setVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }

  return {
    audioRef,
    currentTime,
    duration,
    isLoading,
    play,
    pause,
    seek,
    setVolume
  }
}