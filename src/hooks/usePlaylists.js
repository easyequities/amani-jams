import { useState, useEffect } from 'react'
import { useApp } from '../contexts/AppContext'

export const usePlaylists = () => {
  const { user, isGuest } = useApp()
  const [playlists, setPlaylists] = useState([])
  const [auxPlaylist, setAuxPlaylist] = useState(null)

  // Load playlists from localStorage
  useEffect(() => {
    if (user) {
      const key = isGuest ? 'amani-jams-guest-playlists' : `amani-jams-playlists-${user.id}`
      const saved = localStorage.getItem(key)
      if (saved) {
        const data = JSON.parse(saved)
        setPlaylists(data.playlists || [])
        setAuxPlaylist(data.auxPlaylist || null)
      }
    }
  }, [user, isGuest])

  // Save playlists to localStorage
  const savePlaylists = (newPlaylists, newAuxPlaylist = auxPlaylist) => {
    if (user) {
      const key = isGuest ? 'amani-jams-guest-playlists' : `amani-jams-playlists-${user.id}`
      const data = { playlists: newPlaylists, auxPlaylist: newAuxPlaylist }
      localStorage.setItem(key, JSON.stringify(data))
      setPlaylists(newPlaylists)
      setAuxPlaylist(newAuxPlaylist)
    }
  }

  const createPlaylist = (name, links) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songs: links.map(link => ({ id: Date.now() + Math.random(), link, title: `Song from ${link}`, artist: 'Unknown' })),
      createdAt: new Date().toISOString()
    }
    const updatedPlaylists = [...playlists, newPlaylist]
    savePlaylists(updatedPlaylists)
    return newPlaylist
  }

  const addToAuxPlaylist = (link) => {
    const newSong = {
      id: Date.now().toString(),
      link,
      title: `Song from ${link}`,
      artist: 'Unknown',
      addedAt: new Date().toISOString()
    }

    if (!auxPlaylist) {
      const newAux = {
        id: 'aux-main',
        name: 'Pass the Aux',
        songs: [newSong],
        createdAt: new Date().toISOString()
      }
      savePlaylists(playlists, newAux)
    } else {
      const updatedAux = {
        ...auxPlaylist,
        songs: [...auxPlaylist.songs, newSong]
      }
      savePlaylists(playlists, updatedAux)
    }
  }

  const clearAuxPlaylist = () => {
    savePlaylists(playlists, null)
  }

  const deletePlaylist = (playlistId) => {
    const updatedPlaylists = playlists.filter(p => p.id !== playlistId)
    savePlaylists(updatedPlaylists)
  }

  return {
    playlists,
    auxPlaylist,
    createPlaylist,
    addToAuxPlaylist,
    clearAuxPlaylist,
    deletePlaylist
  }
}