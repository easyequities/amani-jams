import React from 'react'
import { motion } from 'framer-motion'
import { Play, MoreVertical, Trash2 } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

const PlaylistCard = ({ playlist, onPlay, onDelete }) => {
  const { setCurrentTrack, setIsPlaying } = useApp()

  const handlePlay = () => {
    if (playlist.songs.length > 0) {
      setCurrentTrack({ ...playlist.songs[0], playlist })
      setIsPlaying(true)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass-card p-4 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{playlist.name}</h3>
          <p className="text-sm text-gray-400">
            {playlist.songs.length} songs • Created {new Date(playlist.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handlePlay}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Play playlist"
          >
            <Play className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(playlist.id)}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            title="Delete playlist"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {playlist.songs.slice(0, 3).map((song, index) => (
          <div key={song.id} className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 w-4">{index + 1}</span>
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
              <Music className="w-3 h-3 text-white" />
            </div>
            <span className="truncate flex-1">{song.title}</span>
          </div>
        ))}
        {playlist.songs.length > 3 && (
          <div className="text-sm text-gray-400 text-center">
            +{playlist.songs.length - 3} more songs
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default PlaylistCard