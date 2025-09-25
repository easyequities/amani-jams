import React from 'react'
import { motion } from 'framer-motion'
import { Download, Music, Play, Check, X } from 'lucide-react'
import { useExport } from '../../hooks/useExport'
import { useApp } from '../../contexts/AppContext'

const ExportPanel = () => {
  const { playlists } = useApp()
  const { isExporting, exportPlaylist, exportSingleTrack } = useExport()
  const [exportStatus, setExportStatus] = useState({})
  const [selectedTrack, setSelectedTrack] = useState(null)

  const handlePlaylistExport = async (playlist) => {
    setExportStatus(prev => ({ ...prev, [playlist.id]: 'exporting' }))
    
    const result = await exportPlaylist(playlist)
    
    setExportStatus(prev => ({ 
      ...prev, 
      [playlist.id]: result.success ? 'success' : 'error' 
    }))
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setExportStatus(prev => ({ ...prev, [playlist.id]: null }))
    }, 3000)
  }

  const handleTrackExport = async (track) => {
    setExportStatus(prev => ({ ...prev, [track.id]: 'exporting' }))
    
    const result = await exportSingleTrack(track)
    
    setExportStatus(prev => ({ 
      ...prev, 
      [track.id]: result.success ? 'success' : 'error' 
    }))
    
    setTimeout(() => {
      setExportStatus(prev => ({ ...prev, [track.id]: null }))
    }, 3000)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'exporting': return <Download className="w-4 h-4 animate-spin" />
      case 'success': return <Check className="w-4 h-4 text-green-400" />
      case 'error': return <X className="w-4 h-4 text-red-400" />
      default: return <Download className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Playlist Export Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Music className="w-5 h-5 text-cyan-400" />
          Export Playlists
        </h3>
        
        {playlists.length === 0 ? (
          <div className="text-center py-8">
            <Music className="w-12 h-12 mx-auto mb-3 text-gray-600" />
            <p className="text-gray-400">No playlists available for export</p>
          </div>
        ) : (
          <div className="space-y-3">
            {playlists.map(playlist => (
              <motion.div
                key={playlist.id}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{playlist.name}</div>
                  <div className="text-sm text-gray-400">
                    {playlist.songs.length} songs • Created {new Date(playlist.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlaylistExport(playlist)}
                  disabled={isExporting || exportStatus[playlist.id]}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50"
                >
                  {getStatusIcon(exportStatus[playlist.id])}
                  <span className="text-sm">
                    {exportStatus[playlist.id] === 'exporting' ? 'Exporting...' : 
                     exportStatus[playlist.id] === 'success' ? 'Exported!' :
                     exportStatus[playlist.id] === 'error' ? 'Failed' : 'Export'}
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Quick Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <div className="glass-card p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold mb-2">MP3 Format</h4>
          <p className="text-sm text-gray-400 mb-3">High quality audio files</p>
          <div className="text-xs text-cyan-400">Coming Soon</div>
        </div>

        <div className="glass-card p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold mb-2">Metadata Included</h4>
          <p className="text-sm text-gray-400 mb-3">Artist, album, and lyrics</p>
          <div className="text-xs text-cyan-400">Coming Soon</div>
        </div>

        <div className="glass-card p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
            <Play className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold mb-2">ZIP Packages</h4>
          <p className="text-sm text-gray-400 mb-3">Organized file structure</p>
          <div className="text-xs text-cyan-400">Coming Soon</div>
        </div>
      </motion.div>

      {/* Export Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4 bg-cyan-500/10 border border-cyan-500/20"
      >
        <div className="flex items-start gap-3">
          <Download className="w-5 h-5 text-cyan-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-cyan-300 mb-1">Export Feature Info</h4>
            <p className="text-sm text-cyan-200/80">
              Currently exporting simulated data files. Full audio export with metadata, cover art, 
              and embedded lyrics will be available in the next update. The export system will support 
              Spotify and Apple Music integration for direct song processing.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ExportPanel