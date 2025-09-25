import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false)
  const { user } = useApp()

  const exportPlaylist = async (playlist) => {
    setIsExporting(true)
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create a structured data file (simulated export)
      const exportData = {
        playlist: {
          name: playlist.name,
          songCount: playlist.songs.length,
          createdAt: playlist.createdAt,
          exportedAt: new Date().toISOString()
        },
        songs: playlist.songs.map(song => ({
          title: song.title,
          artist: song.artist,
          link: song.link,
          metadata: {
            exported: true,
            format: 'simulated',
            quality: 'high'
          }
        })),
        metadata: {
          version: '1.0',
          exportedBy: user?.username || 'guest',
          platform: 'Amani Jams'
        }
      }

      // Create and download JSON file (simulated export)
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${playlist.name.replace(/[^a-z0-9]/gi, '_')}_export.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      return { success: true, filename: a.download }
    } catch (error) {
      console.error('Export failed:', error)
      return { success: false, error: error.message }
    } finally {
      setIsExporting(false)
    }
  }

  const exportSingleTrack = async (track) => {
    setIsExporting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const trackData = {
        track: {
          title: track.title,
          artist: track.artist,
          exportedAt: new Date().toISOString()
        },
        metadata: {
          format: 'simulated',
          quality: 'high',
          includesLyrics: true,
          includesArtwork: true
        }
      }

      const blob = new Blob([JSON.stringify(trackData, null, 2)], { 
        type: 'application/json' 
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${track.title.replace(/[^a-z0-9]/gi, '_')}_export.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setIsExporting(false)
    }
  }

  return {
    isExporting,
    exportPlaylist,
    exportSingleTrack
  }
}