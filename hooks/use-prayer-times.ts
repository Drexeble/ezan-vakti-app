'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSettings } from '@/hooks/use-settings'
import {
  fetchAladhanTimings,
  reverseGeocode,
  type CalculationMethod,
} from '@/lib/prayer-api'
import {
  parseAladhanClock,
  getPrayerStatus,
  formatHijriDate,
  type Prayer,
  type HijriInfo,
} from '@/lib/prayer-times'

type Status = 'locating' | 'loading' | 'ready' | 'error'

export function usePrayerTimes() {
  const { calculationMethod, language } = useSettings()

  const [status, setStatus] = useState<Status>('locating')
  const [cityName, setCityName] = useState<string>('İstanbul')
  const [prayers, setPrayers] = useState<Prayer[]>([])
  const [hijriDate, setHijriDate] = useState<string>('')
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0)
  const [nextPrayerKey, setNextPrayerKey] = useState<string | undefined>()
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 41.0082,
    lng: 28.9784,
  })

  const loadData = useCallback(
    async (lat: number, lng: number) => {
      setStatus('loading')
      try {
        const city = await reverseGeocode(lat, lng)
        setCityName(city)

        const data = await fetchAladhanTimings(
          lat,
          lng,
          calculationMethod as CalculationMethod
        )

        if (data && data.timings) {
          const parsedPrayers = parseAladhanClock(data.timings)
          setPrayers(parsedPrayers)

          if (data.date?.hijri) {
            const formatted = formatHijriDate(
              data.date.hijri as HijriInfo,
              language || 'tr'
            )
            setHijriDate(formatted)
          }

          setStatus('ready')
        } else {
          setStatus('error')
        }
      } catch (err) {
        console.error('Veri yükleme hatası:', err)
        setStatus('error')
      }
    },
    [calculationMethod, language]
  )

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude }
          setCoords(newCoords)
          loadData(newCoords.lat, newCoords.lng)
        },
        () => {
          loadData(coords.lat, coords.lng)
        },
        { timeout: 10000 }
      )
    } else {
      loadData(coords.lat, coords.lng)
    }
  }, [loadData])

  useEffect(() => {
    if (prayers.length === 0) return

    const updateTimer = () => {
      const { remainingSeconds: secs, nextPrayer } = getPrayerStatus(prayers)
      setRemainingSeconds(secs)
      setNextPrayerKey(nextPrayer?.key)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [prayers])

  return {
    status,
    cityName,
    prayers,
    hijriDate,
    remainingSeconds,
    nextPrayerKey,
    nextPrayer: prayers.find((p) => p.key === nextPrayerKey),
  }
}