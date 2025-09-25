import { useState } from 'react'

export const usePosterMaker = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('pinterest')
  const [posterData, setPosterData] = useState(null)

  // Poster templates configuration
  const templates = {
    pinterest: {
      name: 'Pinterest Style',
      description: 'Modern collage layout with overlapping elements',
      aspectRatio: '3:4',
      colors: ['#ef4444', '#f59e0b', '#10b981'] // Red, Amber, Emerald
    },
    minimalist: {
      name: 'Minimalist',
      description: 'Clean and simple with focus on typography',
      aspectRatio: '2:3',
      colors: ['#000000', '#ffffff', '#6b7280'] // Black, White, Gray
    },
    collage: {
      name: 'Collage Style',
      description: 'Dynamic grid layout with multiple album arts',
      aspectRatio: '1:1',
      colors: ['#8b5cf6', '#06b6d4', '#f97316'] // Violet, Cyan, Orange
    },
    vintage: {
      name: 'Vintage',
      description: 'Retro design with distressed textures',
      aspectRatio: '4:5',
      colors: ['#d97706', '#dc2626', '#7c2d12'] // Amber, Red, Brown
    },
    modern: {
      name: 'Modern',
      description: 'Sleek design with geometric patterns',
      aspectRatio: '16:9',
      colors: ['#3b82f6', '#06b6d4', '#6366f1'] // Blue, Cyan, Indigo
    }
  }

  const generatePoster = async (albumData, template = selectedTemplate) => {
    setIsGenerating(true)
    
    try {
      // Simulate poster generation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const poster = {
        id: Date.now().toString(),
        template,
        albumData,
        generatedAt: new Date().toISOString(),
        previewUrl: `data:image/svg+xml,${encodeURIComponent(createPosterSVG(albumData, template))}`
      }
      
      setPosterData(poster)
      return { success: true, poster }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setIsGenerating(false)
    }
  }

  // Simple SVG generator for poster preview
  const createPosterSVG = (albumData, template) => {
    const templateConfig = templates[template]
    return `
      <svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1f2937"/>
        <rect x="20" y="20" width="260" height="200" fill="#374151" rx="10"/>
        <text x="150" y="250" text-anchor="middle" fill="white" font-family="Arial" font-size="16">${albumData.title}</text>
        <text x="150" y="270" text-anchor="middle" fill="#9ca3af" font-family="Arial" font-size="12">${albumData.artist}</text>
        <text x="150" y="350" text-anchor="middle" fill="${templateConfig.colors[0]}" font-family="Arial" font-size="10">${templateConfig.name} Template</text>
      </svg>
    `
  }

  const exportPoster = (format = 'png') => {
    if (!posterData) return { success: false, error: 'No poster generated' }
    
    // Simulate export process
    const blob = new Blob([`Poster Export: ${posterData.albumData.title} - ${format.toUpperCase()}`], { 
      type: 'text/plain' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${posterData.albumData.title.replace(/[^a-z0-9]/gi, '_')}_poster.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    return { success: true, format }
  }

  return {
    templates,
    selectedTemplate,
    setSelectedTemplate,
    posterData,
    isGenerating,
    generatePoster,
    exportPoster
  }
}