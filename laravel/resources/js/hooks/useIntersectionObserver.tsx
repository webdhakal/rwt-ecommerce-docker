import { useState, useRef, useCallback } from 'react'

export const useIntersectionObserver = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)

  const callbackRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect()
    if (node) {
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.current?.disconnect()
          }
        },
        { threshold },
      )
      observer.current.observe(node)
    }
  }, [])

  return { callbackRef, isVisible }
}
