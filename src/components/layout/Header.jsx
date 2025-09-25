import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'  // ← Add this import
import { Music, User } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

const Header = () => {
  const { user, isGuest } = useApp()
  const navigate = useNavigate()  // ← Add this line

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-card sticky top-0 z-50 mx-4 mt-4"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}  // ← Make logo clickable to go home
          >
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
              <Music className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gradient">Amani Jams</h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            {user || isGuest ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 btn-secondary"
                onClick={() => navigate('/profile')}  // ← Fixed: use navigate instead of window.location
              >
                <User className="w-4 h-4" />
                <span>{user?.username || 'Guest'}</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                onClick={() => navigate('/auth')}  // ← Fixed: use navigate instead of window.location
              >
                Get Started
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header