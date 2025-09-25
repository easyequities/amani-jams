import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, Music } from 'lucide-react'
import { usePlaylists } from '../../hooks/usePlaylists'

const PlaylistCreator = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [playlistName, setPlaylistName] = useState('')
  const [links, setLinks] = useState([''])
  const { createPlaylist } = usePlaylists()

  const addLinkField = () => {
    setLinks([...links, ''])
  }

  const removeLinkField = (index) => {
    if (links.length > 1) {
      setLinks(links.filter((_, i) => i !== index))
    }
  }

  const updateLink = (index, value) => {
    const newLinks = [...links]
    newLinks[index] = value
    setLinks(newLinks)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (playlistName.trim() && links.some(link => link.trim())) {
      createPlaylist(playlistName, links.filter(link => link.trim()))
      setIsCreating(false)
      setPlaylistName('')
      setLinks([''])
    }
  }

  if (!isCreating) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCreating(true)}
        className="w-full glass-card p-6 text-center group hover:bg-white/5 transition-colors"
      >
        <Plus className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
        <span className="font-medium">Create New Playlist</span>
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="glass-card p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Create Playlist</h3>
        <button
          onClick={() => setIsCreating(false)}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Playlist Name</label>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full glass-morphism px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="My Awesome Playlist"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Music Links</label>
          <div className="space-y-2">
            {links.map((link, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => updateLink(index, e.target.value)}
                  className="flex-1 glass-morphism px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="https://open.spotify.com/playlist/..."
                />
                {links.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLinkField(index)}
                    className="px-3 glass-morphism rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addLinkField}
            className="mt-2 flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
          >
            <Plus className="w-4 h-4" />
            Add another link
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 btn-primary py-2"
          >
            Create Playlist
          </motion.button>
          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="px-6 btn-secondary py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default PlaylistCreator