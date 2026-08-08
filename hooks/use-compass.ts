'use client'

import { useState, useEffect } from 'react'

export function useCompass() {
  const [heading, setHeading] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState<boolean>(true)

  useEffect(() => {
    // Mobil cihaz pusula desteği kontrolü
    if (!window.DeviceOrientationEvent) {
      setIsSupported(false)
      return
    }

    const handleOrientation = (e: DeviceOrientationEvent) => {
      // iOS için webkitCompassHeading, Android için alpha değeri
      let compassHeading: number | null = null

      if ((e as any).webkitCompassHeading !== undefined) {
        // iOS cihazlar
        compassHeading = (e as any).webkitCompassHeading
      } else if (e.alpha !== null) {
        // Android cihazlar (Kutup yönüne göre düzeltilmiş)
        compassHeading = 360 - e.alpha
      }

      if (compassHeading !== null) {
        setHeading(Math.round(compassHeading))
      }
    }

    // iOS 13+ için sensör izni isteme kontrolü
    const requestPermission = async () => {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission()
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true)
          } else {
            setError('Pusula sensör izni reddedildi.')
          }
        } catch (err) {
          setError('Pusula izni alınırken hata oluştu.')
        }
      } else {
        // Android ve standart tarayıcılar
        window.addEventListener('deviceorientation', handleOrientation, true)
      }
    }

    requestPermission()

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
    }
  }, [])

  return { heading, error, isSupported }
}