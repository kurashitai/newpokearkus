'use client'

import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import React Query DevTools to avoid SSR issues
const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then((mod) => ({
    default: mod.ReactQueryDevtools
  })),
  {
    ssr: false,
    loading: () => null
  }
)

// Create a custom query client with premium configurations
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Stale time - how long data is considered fresh
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Cache time - how long inactive data stays in cache
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        // Retry configuration for failed requests
        retry: (failureCount, error: any) => {
          // Don't retry on 4xx errors
          if (error?.status >= 400 && error?.status < 500) {
            return false
          }
          // Retry up to 3 times for other errors
          return failureCount < 3
        },
        // Retry delay with exponential backoff
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Refetch on window focus for fresh data
        refetchOnWindowFocus: true,
        // Refetch on reconnect
        refetchOnReconnect: true,
        // Don't refetch on mount if data is fresh
        refetchOnMount: true,
      },
      mutations: {
        // Retry mutations once on failure
        retry: 1,
        // Mutation retry delay
        retryDelay: 1000,
      },
    },
  })
}

interface QueryProviderProps {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Create a stable query client instance
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show React Query DevTools in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
        />
      )}
    </QueryClientProvider>
  )
}

// Custom hook for query invalidation
export function useQueryInvalidation() {
  const queryClient = useQueryClient()

  const invalidateQueries = (queryKey: string[]) => {
    return queryClient.invalidateQueries({ queryKey })
  }

  const refetchQueries = (queryKey: string[]) => {
    return queryClient.refetchQueries({ queryKey })
  }

  const removeQueries = (queryKey: string[]) => {
    return queryClient.removeQueries({ queryKey })
  }

  const clearCache = () => {
    return queryClient.clear()
  }

  return {
    invalidateQueries,
    refetchQueries,
    removeQueries,
    clearCache,
  }
}

// Export for accessing query client in components
export { useQueryClient } from '@tanstack/react-query'

export default QueryProvider;