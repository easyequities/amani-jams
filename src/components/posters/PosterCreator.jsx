import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { usePosterMaker } from '../../hooks/usePosterMaker'
import { ImageIcon, Download, Zap, Palette, Layout } from 'lucide-react'

const PosterCreator = () => {
  const [albumLink, setAlbumLink] = useState('')
  const [albumData, setAlbumData] = useState(null)
  const { 
    templates, 
    selectedTemplate, 
    setSelectedTemplate, 
    posterData, 
    isGenerating, 
    generatePoster, 
    exportPoster 
  } = usePosterMaker()

  const fetchAlbumData = async (link) => {
    // Simulate fetching album data from link
    return {
      title: 'Sample Album',
      artist: 'Sample Artist',
      year: '2024',
      coverUrl: 'https://via.placeholder.com/300x300',
      tracks: ['Track 1', 'Track 2', 'Track 3', 'Track 4', 'Track 5']
    }
  }

  const handleGenerate = async () => {
    if (!albumData) {
      const data = await fetchAlbumData(albumLink)
      setAlbumData(data)
    }
    
    await generatePoster(albumData || {
      title: 'Custom Poster',
      artist: 'Your Music',
      year: '2024',
      coverUrl: 'https://via.placeholder.com/300x300',
      tracks: ['Your', 'Music', 'Collection']
    })
  }

  const handleExport = (format) => {
    exportPoster(format)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-orange-400" />
          Create New Poster
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Album or Song Link</label>
            <input
              type="url"
              value={albumLink}
              onChange={(e) => setAlbumLink(e.target.value)}
              placeholder="Paste Spotify or Apple Music link..."
              className="w-full glass-morphism px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select Template</label>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(templates).map(([key, template]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTemplate(key)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTemplate === key 
                      ? 'border-orange-500 bg-orange-500/20' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="text-xs font-medium mb-1">{template.name}</div>
                  <div className="text-[10px] text-gray-400">{template.aspectRatio}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Zap className="w-4 h-4 animate-pulse" />
                Generating Poster...
              </>
            ) : (
              <>
                <Palette className="w-4 h-4" />
                Generate Poster
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Template Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Layout className="w-4 h-4 text-purple-400" />
          {templates[selectedTemplate].name} Template
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-lg"></div>
                <div className="text-white font-medium">Album Title</div>
                <div className="text-gray-400 text-sm">Artist Name</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-400">Style:</span>
              <div className="font-medium">{templates[selectedTemplate].description}</div>
            </div>
            <div>
              <span className="text-sm text-gray-400">Aspect Ratio:</span>
              <div className="font-medium">{templates[selectedTemplate].aspectRatio}</div>
            </div>
            <div>
              <span className="text-sm text-gray-400">Color Palette:</span>
              <div className="flex gap-1 mt-1">
                {templates[selectedTemplate].colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Generated Poster */}
      {posterData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6"
        >
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-green-400" />
            Your Generated Poster
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-[3/4] bg-gray-800 rounded-lg flex items-center justify-center">
              <img 
                src={posterData.previewUrl} 
                alt="Generated poster"
                className="max-w-full max-h-full"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Export Options</h5>
                <div className="grid grid-cols-2 gap-2">
                  {['png', 'jpg', 'pdf', 'svg'].map((format) => (
                    <motion.button
                      key={format}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleExport(format)}
                      className="flex items-center gap-2 p-3 glass-morphism rounded-lg hover:bg-white/5 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm uppercase">{format}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-400">Poster Details</div>
                <div className="text-sm">
                  <strong>Template:</strong> {templates[posterData.template].name}
                </div>
                <div className="text-sm">
                  <strong>Generated:</strong> {new Date(posterData.generatedAt).toLocaleString()}
                </div>
                <div className="text-sm">
                  <strong>Size:</strong> 3000 × 4000 pixels (4K)
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <div className="glass-card p-4 text-center group cursor-pointer hover:bg-white/5 transition-all">
          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold mb-1">Social Media</h4>
          <p className="text-sm text-gray-400">Optimized for Instagram, Twitter</p>
        </div>

        <div className="glass-card p-4 text-center group cursor-pointer hover:bg-white/5 transition-all">
          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold mb-1">Print Ready</h4>
          <p className="text-sm text-gray-400">A4, A3, high resolution</p>
        </div>

        <div className="glass-card p-4 text-center group cursor-pointer hover:bg-white/5 transition-all">
          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold mb-1">Custom Colors</h4>
          <p className="text-sm text-gray-400">Personalize your design</p>
        </div>
      </motion.div>
    </div>
  )
}

export default PosterCreator