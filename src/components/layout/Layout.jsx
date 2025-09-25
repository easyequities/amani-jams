import React from 'react'
import Header from './Header'
import Footer from './Footer'
import MusicPlayer from '../music/MusicPlayer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <MusicPlayer />
      <Footer />
    </div>
  )
}

export default Layout