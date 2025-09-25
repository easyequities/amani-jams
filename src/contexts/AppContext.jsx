import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isGuest, setIsGuest] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('amani-jams-user')
    const guestStatus = localStorage.getItem('amani-jams-guest')
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (guestStatus === 'true') {
      setIsGuest(true)
      setUser({ id: 'guest', username: 'Guest', isGuest: true })
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    setIsGuest(false)
    localStorage.setItem('amani-jams-user', JSON.stringify(userData))
    localStorage.setItem('amani-jams-guest', 'false')
  }

  const signup = (userData) => {
    const newUser = {
      id: Date.now().toString(),
      username: userData.username,
      password: userData.password,
      avatar: userData.avatar || null,
      createdAt: new Date().toISOString()
    }
    setUser(newUser)
    setIsGuest(false)
    localStorage.setItem('amani-jams-user', JSON.stringify(newUser))
    localStorage.setItem('amani-jams-guest', 'false')
  }

  const enterGuestMode = () => {
    const guestUser = { id: 'guest', username: 'Guest', isGuest: true }
    setUser(guestUser)
    setIsGuest(true)
    localStorage.setItem('amani-jams-user', JSON.stringify(guestUser))
    localStorage.setItem('amani-jams-guest', 'true')
  }

  const logout = () => {
    setUser(null)
    setIsGuest(false)
    localStorage.removeItem('amani-jams-user')
    localStorage.removeItem('amani-jams-guest')
  }

  const convertGuestToUser = (userData) => {
    const newUser = {
      id: Date.now().toString(),
      username: userData.username,
      password: userData.password,
      avatar: userData.avatar || null,
      createdAt: new Date().toISOString()
    }
    setUser(newUser)
    setIsGuest(false)
    localStorage.setItem('amani-jams-user', JSON.stringify(newUser))
    localStorage.setItem('amani-jams-guest', 'false')
    
    // TODO: Migrate guest data to user data
    localStorage.removeItem('amani-jams-guest-playlists')
  }

  const value = {
    user,
    isGuest,
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    login,
    signup,
    logout,
    enterGuestMode,
    convertGuestToUser
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}