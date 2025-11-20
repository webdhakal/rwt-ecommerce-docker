import { createContext, useContext, useEffect, useState } from 'react'
import { Inertia } from '@inertiajs/inertia'

const LoaderContext = createContext<boolean>(false)

const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Listen to navigation events
    const startNavigation = (event: any) => {
      if (event.detail?.preserveScroll || event.detail?.preserveState) return // Ignore form submissions & modals
      setLoading(true)
    }

    const stopNavigation = () => setLoading(false)

    Inertia.on('start', startNavigation)
    Inertia.on('finish', stopNavigation)

  }, [])

  return <LoaderContext.Provider value={loading}>{children}</LoaderContext.Provider>
}
export const useLoader = () => useContext(LoaderContext)
export default LoaderProvider