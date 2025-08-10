import { useState, useEffect } from 'react'
import { VendorCard } from '@/types/vendor'

export function useVendorCards() {
  const [vendorCards, setVendorCards] = useState<VendorCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchVendorCards()
  }, [])

  const fetchVendorCards = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/vendor-cards/featured')
      if (!response.ok) {
        throw new Error('Failed to fetch vendor cards')
      }
      
      const data = await response.json()
      setVendorCards(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching vendor cards:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchVendorCards()
  }

  return {
    vendorCards,
    loading,
    error,
    refetch
  }
}
