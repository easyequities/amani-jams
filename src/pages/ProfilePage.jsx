import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'
import { usePlaylists } from '../hooks/usePlaylists'
import PlaylistCreator from '../components/playlists/PlaylistCreator'
import PlaylistCard from '../components/playlists/PlaylistCard'
import AuxPlaylist from '../components/playlists/AuxPlaylist'
import ExportPanel from '../components/export/ExportPanel'
import PosterCreator from '../components/posters/PosterCreator'
import SettingsPanel from '../components/settings/SettingsPanel'
import { User, LogOut, Music, Users, Download, Image as ImageIcon, Settings } from 'lucide-react'

const ProfilePage = () => {
  const { user, isGuest, logout, convertGuestToUser } = useApp()
  const { playlists, auxPlaylist, deletePlaylist } = usePlaylists()
  const [activeTab, setActiveTab] = useState('playlists')
  const [showConvertModal, setShowConvertModal] = useState(isGuest)

  const handleConvertToAccount = (userData) => {
    convertGuestToUser(userData)
    setShowConvertModal(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-gray-400">You need to be signed in to view this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      {/* Convert Guest Modal */}
      {showConvertModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4">Save Your Profile?</h3>
            <p className="text-gray-400 mb-6">
              Convert your guest account to a permanent one to save your data across devices.
            </p>
            <button
              onClick={() => handleConvertToAccount({ username: user.username, password: '1234' })}
              className="w-full btn-primary mb-3"
            >
              Create Account
            </button>
            <button
              onClick={() => setShowConvertModal(false)}
              className="w-full btn-secondary"
            >
              Continue as Guest
            </button>
          </motion.div>
        </div>
      )}

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-gray-400">
                {isGuest ? 'Guest Mode' : 'Premium Member'}
              </p>
              <p className="text-sm text-gray-500">
                {playlists.length} playlists • {auxPlaylist ? `${auxPlaylist.songs.length} songs in aux` : 'No aux playlist'}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="btn-secondary flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </motion.button>
        </div>

        {isGuest && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm">
              🔒 You're in guest mode. Data is saved only to this browser.
            </p>
            <button
              onClick={() => setShowConvertModal(true)}
              className="text-yellow-300 hover:text-yellow-200 text-sm mt-1"
            >
              Convert to permanent account →
            </button>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-5 gap-4 mb-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('playlists')}
          className={`glass-card p-4 text-center group transition-all ${
            activeTab === 'playlists' ? 'ring-2 ring-cyan-500 bg-white/10' : ''
          }`}
        >
          <Music className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
          <span className="font-medium">My Playlists</span>
          <div className="text-xs text-gray-400 mt-1">{playlists.length} created</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('aux')}
          className={`glass-card p-4 text-center group transition-all ${
            activeTab === 'aux' ? 'ring-2 ring-purple-500 bg-white/10' : ''
          }`}
        >
          <Users className="w-8 h-8 mx-auto mb-2 text-purple-400" />
          <span className="font-medium">Aux Mode</span>
          <div className="text-xs text-gray-400 mt-1">
            {auxPlaylist ? `${auxPlaylist.songs.length} mixed` : 'Not started'}
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('export')}
          className={`glass-card p-4 text-center group transition-all ${
            activeTab === 'export' ? 'ring-2 ring-green-500 bg-white/10' : ''
          }`}
        >
          <Download className="w-8 h-8 mx-auto mb-2 text-green-400" />
          <span className="font-medium">Export</span>
          <div className="text-xs text-gray-400 mt-1">Download music</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('posters')}
          className={`glass-card p-4 text-center group transition-all ${
            activeTab === 'posters' ? 'ring-2 ring-orange-500 bg-white/10' : ''
          }`}
        >
          <ImageIcon className="w-8 h-8 mx-auto mb-2 text-orange-400" />
          <span className="font-medium">Posters</span>
          <div className="text-xs text-gray-400 mt-1">Create artwork</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('settings')}
          className={`glass-card p-4 text-center group transition-all ${
            activeTab === 'settings' ? 'ring-2 ring-gray-500 bg-white/10' : ''
          }`}
        >
          <Settings className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <span className="font-medium">Settings</span>
          <div className="text-xs text-gray-400 mt-1">Preferences</div>
        </motion.button>
      </motion.div>

      {/* Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card p-6"
      >
        {activeTab === 'playlists' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">My Playlists</h3>
              <span className="text-gray-400">
                {playlists.length} playlist{playlists.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <PlaylistCreator />
            
            {playlists.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {playlists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onDelete={deletePlaylist}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Music className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <h4 className="text-lg font-semibold mb-2">No playlists yet</h4>
                <p className="text-gray-400">Create your first playlist to get started!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'aux' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Aux Mode</h3>
              <span className="text-gray-400">
                {auxPlaylist ? `${auxPlaylist.songs.length} songs mixed` : 'Collaborative mixing'}
              </span>
            </div>
            <AuxPlaylist />
          </div>
        )}

        {activeTab === 'export' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Export Music</h3>
              <span className="text-gray-400">Download your creations</span>
            </div>
            <ExportPanel />
          </div>
        )}

        {activeTab === 'posters' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Poster Maker</h3>
              <span className="text-gray-400">Create stunning artwork</span>
            </div>
            <PosterCreator />
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Settings</h3>
              <span className="text-gray-400">Customize your experience</span>
            </div>
            <SettingsPanel />
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default ProfilePage