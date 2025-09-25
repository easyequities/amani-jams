import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card mx-4 mb-4 mt-8"
    >
      <div className="container mx-auto px-6 py-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <span>Made with</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </motion.div>
          <span>for music lovers everywhere</span>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer