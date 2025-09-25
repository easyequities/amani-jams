import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Users, Trash2, Play } from 'lucide-react'
import { usePlaylists } from '../../hooks/usePlaylists'
import { useApp } from '../../contexts/AppContext'

const AuxPlaylist = () => {
  const [isAdding, setIsAdding] = useState(false)
  const [newLink, setNewLink] = useState('')
  const { auxPlaylist, addToAuxPlaylist, clearAuxPlaylist } = usePlaylists()
  const { setCurrentTrack, setIsPlaying } = useApp()

  const handleAddLink = (e) => {
    e.preventDefault()
    if (newLink.trim()) {
      addToAuxPlaylist(newLink)
      setNewLink('')
      setIsAdding(false)
    }
  }

  const playSong = (song) => {
    setCurrentTrack({ ...song, playlist: auxPlaylist })
    setIsPlaying(true)
  }

  if (!auxPlaylist) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <Users className="w-16 h-16 mx-auto mb-4 text-purple-400" />
        <h3 className="text-xl font-semibold mb-2">No Aux Playlist Yet</h3>
        <p className="text-gray-400 mb-4">Start a collaborative playlist mixing session</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          className="btn-primary"
        >
          Start Aux Session
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            {auxPlaylist.name}
          </h3>
          <p className="text-gray-400">{auxPlaylist.songs.length} songs mixed together</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => auxPlaylist.songs.length > 0 && playSong(auxPlaylist.songs[0])}
            className="btn-primary flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Play All
          </motion.button>
          <button
            onClick={clearAuxPlaylist}
            className="p-2 glass-morphism rounded-lg hover:bg-red-500/20 transition-colors"
            title="Clear aux playlist"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isAdding ? (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleAddLink}
          className="mb-4"
        >
          <div className="flex gap-2">
            <input
              type="url"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="flex-1 glass-morphism px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Paste Spotify or Apple Music link..."
              required
            />
            <button type="submit" className="btn-primary px-4">
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAdding(true)}
          className="w-full glass-morphism p-3 rounded-lg flex items-center justify-center gap-2 mb-4 hover:bg-white/5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Playlist to Mix
        </motion.button>
      )}

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {auxPlaylist.songs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <span className="text-gray-400 w-6 text-center">{index + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{song.title}</div>
              <div className="text-sm text-gray-400 truncate">{song.artist}</div>
            </div>
            <button
              onClick={() => playSong(song)}
              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded transition-all"
            >
              <Play className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default AuxPlaylist