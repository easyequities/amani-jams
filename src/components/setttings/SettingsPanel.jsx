import React from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../contexts/AppContext'
import { Settings, Moon, Sun, Bell, Trash2 } from 'lucide-react'

const SettingsPanel = () => {
  const { user, isGuest } = useApp()
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Appearance Settings */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          Appearance
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Dark Mode</div>
              <div className="text-sm text-gray-400">Use dark theme</div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-all relative ${
                darkMode ? 'bg-cyan-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                  darkMode ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Glass Morphism</div>
              <div className="text-sm text-gray-400">Transparent background effects</div>
            </div>
            <div className="text-cyan-400 text-sm">Always On</div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-400" />
          Notifications
        </h3>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Export Complete</div>
            <div className="text-sm text-gray-400">Notify when exports finish</div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-all relative ${
              notifications ? 'bg-purple-500' : 'bg-gray-600'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                notifications ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-red-400" />
          Data Management
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Storage Usage</div>
              <div className="text-sm text-gray-400">
                {isGuest ? 'Local storage' : 'Cloud storage'}
              </div>
            </div>
            <div className="text-sm text-gray-400">~2.3 MB used</div>
          </div>

          <button
            onClick={clearAllData}
            className="w-full py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-red-400 font-medium"
          >
            Clear All Data
          </button>
          
          {isGuest && (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="text-yellow-400 text-sm">
                💡 Guest data is stored locally. Create an account to sync across devices.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">About Amani Jams</h3>
        <div className="space-y-2 text-sm text-gray-400">
          <div>Version 1.0.0</div>
          <div>Built with React, Tailwind CSS, and Framer Motion</div>
          <div>© 2024 Amani Jams. All rights reserved.</div>
        </div>
      </div>
    </motion.div>
  )
}

export default SettingsPanel