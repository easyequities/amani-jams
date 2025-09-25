import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { User, Camera, Eye, EyeOff } from 'lucide-react'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    avatar: null
  })
  const [avatarPreview, setAvatarPreview] = useState(null)
  const { login, signup, enterGuestMode } = useApp()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, avatar: file }))
      const reader = new FileReader()
      reader.onload = (e) => setAvatarPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password.length < 4) {
      alert('Password must be at least 4 characters')
      return
    }

    if (isLogin) {
      login(formData)
    } else {
      signup(formData)
    }
    navigate('/profile')
  }

  const handleGuestMode = () => {
    enterGuestMode()
    navigate('/profile')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto mb-4 relative"
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover border-4 border-white/20"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
            {!isLogin && (
              <label className="absolute bottom-0 right-0 bg-cyan-500 rounded-full p-2 cursor-pointer hover:bg-cyan-600 transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            )}
          </motion.div>
          <h2 className="text-3xl font-bold">
            {isLogin ? 'Welcome Back' : 'Join Amani Jams'}
          </h2>
          <p className="text-gray-400 mt-2">
            {isLogin ? 'Sign in to your account' : 'Create your music profile'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full glass-morphism px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full glass-morphism px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-12"
                placeholder="Enter your password (min. 4 chars)"
                minLength="4"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Minimum 4 characters</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full btn-primary py-3"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGuestMode}
            className="w-full btn-secondary py-3"
          >
            Continue as Guest
          </motion.button>
          <p className="text-xs text-gray-400 text-center mt-2">
            Guest mode saves data only to this browser
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthPage