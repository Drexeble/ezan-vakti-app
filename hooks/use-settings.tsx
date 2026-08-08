'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'tr' | 'en' | 'ar'
type TimeFormat = '12h' | '24h'
type CalculationMethod = number

interface SettingsContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  timeFormat: TimeFormat
  setTimeFormat: (format: TimeFormat) => void
  calculationMethod: CalculationMethod
  setCalculationMethod: (method: CalculationMethod) => void
  soundEnabled: boolean
  setSoundEnabled: (enabled: boolean) => void
  volume: number
  setVolume: (vol: number) => void
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('tr')
  const [timeFormat, setTimeFormatState] = useState<TimeFormat>('24h')
  const [calculationMethod, setCalculationMethodState] = useState<CalculationMethod>(13)
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true)
  const [volume, setVolumeState] = useState<number>(0.8)

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    const savedFormat = localStorage.getItem('timeFormat') as TimeFormat
    const savedMethod = localStorage.getItem('calculationMethod')
    const savedSound = localStorage.getItem('soundEnabled')
    const savedVolume = localStorage.getItem('volume')

    if (savedLang) setLanguageState(savedLang)
    if (savedFormat) setTimeFormatState(savedFormat)
    if (savedMethod) setCalculationMethodState(Number(savedMethod))
    if (savedSound !== null) setSoundEnabledState(savedSound === 'true')
    if (savedVolume !== null) setVolumeState(Number(savedVolume))
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const setTimeFormat = (format: TimeFormat) => {
    setTimeFormatState(format)
    localStorage.setItem('timeFormat', format)
  }

  const setCalculationMethod = (method: CalculationMethod) => {
    setCalculationMethodState(method)
    localStorage.setItem('calculationMethod', String(method))
  }

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled)
    localStorage.setItem('soundEnabled', String(enabled))
  }

  const setVolume = (vol: number) => {
    setVolumeState(vol)
    localStorage.setItem('volume', String(vol))
  }

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        timeFormat,
        setTimeFormat,
        calculationMethod,
        setCalculationMethod,
        soundEnabled,
        setSoundEnabled,
        volume,
        setVolume,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) {
    throw new Error('useSettings must be used within a <SettingsProvider>')
  }
  return ctx
}