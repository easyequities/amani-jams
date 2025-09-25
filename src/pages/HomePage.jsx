import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Music, Users, Download, Image as ImageIcon } from 'lucide-react'

const HomePage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Music,
      title: 'Smart Playlists',
      description: 'Import from Spotify & Apple Music, create perfect mixes',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Aux Mode',
      description: 'Collaborative playlist mixing with friends',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Download,
      title: 'Export & Save',
      description: 'Download your music with metadata and lyrics',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: ImageIcon,
      title: 'Poster Maker',
      description: 'Create stunning posters from your favorite albums',
      color: 'from-orange-500 to-red-600'
    }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-gradient">Your Music,</span>
            <br />
            <span>Reimagined</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Amani Jams transforms how you interact with music. Create, mix, export, 
            and showcase your playlists with stunning design and seamless functionality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/auth')}
            className="btn-primary text-lg px-8 py-4"
          >
            Start Creating
          </motion.button>
          <button className="btn-secondary text-lg px-8 py-4">
            Explore Features
          </button>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-card p-6 group cursor-pointer"
          >
            <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} w-fit mb-4`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* How It Works Section */}
      <section className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6"
            >
              <div className="text-2xl font-bold text-cyan-400 mb-2">1</div>
              <h3 className="text-lg font-semibold mb-2">Sign Up or Use Guest Mode</h3>
              <p className="text-gray-400">Start instantly with guest mode or create your permanent profile</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6"
            >
              <div className="text-2xl font-bold text-purple-400 mb-2">2</div>
              <h3 className="text-lg font-semibold mb-2">Import Your Music</h3>
              <p className="text-gray-400">Add playlists from Spotify and Apple Music with simple links</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6"
            >
              <div className="text-2xl font-bold text-green-400 mb-2">3</div>
              <h3 className="text-lg font-semibold mb-2">Create & Share</h3>
              <p className="text-gray-400">Mix playlists, export music, and create stunning posters</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card p-12 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Music Experience?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of music lovers who are already creating amazing playlists and posters
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/auth')}
            className="btn-primary text-lg px-12 py-4"
          >
            Get Started Free
          </motion.button>
          <p className="text-sm text-gray-400 mt-4">No credit card required • Start in seconds</p>
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage