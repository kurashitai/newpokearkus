'use client'

import { useEffect } from 'react'
import { initializeStore } from '@/lib/store'

export function StoreInitializer() {
  useEffect(() => {
    // Initialize store with saved preferences
    initializeStore()
  }, [])

  // This component doesn't render anything
  return null
}