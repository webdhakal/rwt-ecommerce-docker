export function calculateTimeInterval(endTime: Date): {
  days: number
  hours: number
  minutes: number
  seconds: number
} | null {
  const now = new Date()
  const difference = endTime.getTime() - now.getTime()

  if (difference <= 0) return null

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}
