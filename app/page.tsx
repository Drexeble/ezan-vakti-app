'use client'

import { useState, useRef, useEffect } from 'react'
import { Home as HomeIcon, Compass, Settings, Volume2, VolumeX, Play, Square, Globe, Check, RotateCw } from 'lucide-react'
import { useSettings } from '@/hooks/use-settings'
import { useTranslation } from '@/hooks/use-translation'
import { usePrayerTimes } from '@/hooks/use-prayer-times'

export default function Page() {
  const [activeTab, setActiveTab] = useState<'home' | 'qibla' | 'settings'>('home')
  const [isPlayingTest, setIsPlayingTest] = useState(false)
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [tempLanguage, setTempLanguage] = useState<'tr' | 'en' | 'ar'>('tr')

  // Pusula Sensör Durumları
  const [heading, setHeading] = useState<number | null>(null)
  const [needsPermission, setNeedsPermission] = useState<boolean>(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [lastPlayedPrayer, setLastPlayedPrayer] = useState<string | null>(null)

  const {
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
  } = useSettings()

  const { t } = useTranslation()
  const { cityName, prayers, remainingSeconds, nextPrayer } = usePrayerTimes()

  const audioPath = '/audio/Abdul-Hakam.mp3'
  const qiblaAngle = 155 // Varsayılan Kıble Açısı

  // İlk açılışta dil seçimi kontrolü
  useEffect(() => {
    const hasChosenLang = localStorage.getItem('has_chosen_language')
    if (!hasChosenLang) {
      setTempLanguage((language as any) || 'tr')
      setShowLanguageModal(true)
    }
  }, [language])

  const handleSaveLanguage = () => {
    setLanguage(tempLanguage)
    localStorage.setItem('has_chosen_language', 'true')
    setShowLanguageModal(false)
  }

  // Canlı Pusula Sensörü Dinleyici
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleOrientation = (e: DeviceOrientationEvent) => {
      let compassHeading: number | null = null

      if ((e as any).webkitCompassHeading !== undefined) {
        // iOS Cihazlar
        compassHeading = (e as any).webkitCompassHeading
      } else if (e.alpha !== null) {
        // Android Cihazlar
        compassHeading = (360 - e.alpha) % 360
      }

      if (compassHeading !== null) {
        setHeading(Math.round(compassHeading))
      }
    }

    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      setNeedsPermission(true)
    } else if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true)
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
    }
  }, [])

  const requestCompassPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission()
        if (permission === 'granted') {
          setNeedsPermission(false)
          window.addEventListener('deviceorientation', (e: DeviceOrientationEvent) => {
            if ((e as any).webkitCompassHeading !== undefined) {
              setHeading(Math.round((e as any).webkitCompassHeading))
            }
          }, true)
        }
      } catch (err) {
        console.error('Sensör izni hatası:', err)
      }
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsPlayingTest(false)
  }

  const playAudioWithLimit = () => {
    if (!audioRef.current) return

    if (timerRef.current) clearTimeout(timerRef.current)

    audioRef.current.volume = volume
    audioRef.current
      .play()
      .then(() => {
        setIsPlayingTest(true)
        timerRef.current = setTimeout(() => {
          stopAudio()
        }, 60000)
      })
      .catch((err) => {
        console.error('Ezan çalma hatası:', err)
      })
  }

  useEffect(() => {
    if (!soundEnabled || remainingSeconds === undefined || !nextPrayer) return

    if (remainingSeconds === 0 && lastPlayedPrayer !== nextPrayer.key) {
      setLastPlayedPrayer(nextPrayer.key)
      playAudioWithLimit()
    }
  }, [remainingSeconds, nextPrayer, soundEnabled, volume, lastPlayedPrayer])

  const toggleTestSound = () => {
    if (isPlayingTest) {
      stopAudio()
    } else {
      playAudioWithLimit()
    }
  }

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol)
    if (audioRef.current) {
      audioRef.current.volume = newVol
    }
  }

  const formattedGregorianDate = new Intl.DateTimeFormat(
    language === 'tr' ? 'tr-TR' : language === 'ar' ? 'ar-SA' : 'en-US',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  ).format(new Date())

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const formatPrayerTime = (timeStr: string) => {
    if (!timeStr || timeStr === '00:00') return '00:00'
    if (timeFormat === '24h') return timeStr

    const [h, m] = timeStr.split(':').map(Number)
    const period = h >= 12 ? 'PM' : 'AM'
    const hours12 = h % 12 || 12
    return `${hours12}:${String(m).padStart(2, '0')} ${period}`
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 font-sans antialiased select-none">
      <audio
        ref={audioRef}
        src={audioPath}
        onEnded={stopAudio}
        preload="auto"
      />

      {/* İLK AÇILIŞ DİL SEÇİM MODALI */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="text-center space-y-2">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
                <Globe className="size-6" />
              </div>
              <h2 className="text-lg font-bold text-white">Select Language / Dil Seçin</h2>
              <p className="text-xs text-slate-400">
                Lütfen devam etmek için uygulama dilini seçin.
              </p>
            </div>

            <div className="space-y-2">
              {[
                { code: 'tr', name: 'Türkçe' },
                { code: 'en', name: 'English' },
                { code: 'ar', name: 'العربية' },
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setTempLanguage(item.code as any)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-sm font-medium ${
                    tempLanguage === item.code
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                      : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <span>{item.name}</span>
                  {tempLanguage === item.code && <Check className="size-4 text-amber-400" />}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSaveLanguage}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all"
            >
              Kaydet / Continue
            </button>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-md p-4 space-y-6">
        
        {/* TAB 1: ANA SAYFA */}
        {activeTab === 'home' && (
          <>
            <header className="text-center space-y-1 pt-4">
              <h1 className="text-2xl font-bold tracking-tight text-white">{cityName}</h1>
              <p className="text-sm font-medium text-amber-400">{formattedGregorianDate}</p>
            </header>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center backdrop-blur-sm shadow-xl">
              <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
                {nextPrayer ? t(nextPrayer.key) : t('nextPrayer')}
              </span>
              <div className="my-2 text-4xl font-extrabold tracking-tight text-white font-mono">
                {formatTimer(remainingSeconds)}
              </div>
              <span className="text-xs text-slate-400">{t('remainingTime')}</span>

              {isPlayingTest && (
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={stopAudio}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold hover:bg-red-500/30 transition-all animate-pulse"
                  >
                    <Square className="size-4 fill-red-400" />
                    {t('stopAzan')}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                {t('today')}
              </h2>
              <div className="space-y-2">
                {prayers.map((prayer) => {
                  const isNext = nextPrayer?.key === prayer.key
                  return (
                    <div
                      key={prayer.key}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        isNext
                          ? 'bg-amber-500/10 border border-amber-500/40 text-amber-300'
                          : 'bg-slate-900/80 border border-slate-800/80 text-slate-300'
                      }`}
                    >
                      <span>{t(prayer.key)}</span>
                      <span className="font-mono">{formatPrayerTime(prayer.time)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* TAB 2: KIBLE (CANLI PUSULA) */}
        {activeTab === 'qibla' && (
          <div className="flex flex-col items-center justify-center py-6 space-y-6 text-center px-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">{t('qibla')}</h2>
              <p className="text-xs text-amber-400 font-medium">{cityName}</p>
            </div>

            {/* iOS İzin Butonu (Gerekirse) */}
            {needsPermission && (
              <button
                type="button"
                onClick={requestCompassPermission}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 transition-all"
              >
                <RotateCw className="size-4" />
                Pusula Sensörünü Etkinleştir
              </button>
            )}

            {/* Canlı Dönen Pusula Kadranı */}
            <div 
              className="relative flex items-center justify-center size-60 rounded-full bg-slate-900 border-4 border-slate-800 shadow-2xl transition-transform duration-200 ease-out"
              style={{
                transform: heading !== null ? `rotate(${-heading}deg)` : 'none'
              }}
            >
              <span className="absolute top-2 text-[12px] font-extrabold text-red-500">N</span>
              <span className="absolute bottom-2 text-[12px] font-extrabold text-slate-500">S</span>
              <span className="absolute left-2 text-[12px] font-extrabold text-slate-500">W</span>
              <span className="absolute right-2 text-[12px] font-extrabold text-slate-500">E</span>

              <div className="size-3 rounded-full bg-amber-400 shadow-md shadow-amber-400/50 z-20" />

              {/* Kıble Gösterge Ok ve İkonu */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-start pt-4 transition-transform duration-200 ease-out"
                style={{ transform: `rotate(${qiblaAngle}deg)` }}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="p-1.5 rounded-lg bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/50">
                    <svg className="size-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 4H5C3.89 4 3 4.89 3 6V18C3 19.11 3.89 20 5 20H19C20.11 20 21 19.11 21 18V6C21 4.89 20.11 4 19 4ZM19 8H5V6H19V8Z" />
                    </svg>
                  </div>
                  <div className="w-1.5 h-20 bg-gradient-to-b from-amber-400 to-transparent rounded-full" />
                </div>
              </div>
            </div>

            {/* Dinamik Açıklama Ve Sensör Durum Kartı */}
            <div className="w-full max-w-xs p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
              <p className="text-xs font-semibold text-amber-400">
                📍 {heading !== null ? `Açı: ${heading}°` : t('qiblaTitle')}
              </p>
              <p className="text-xs text-slate-300">
                {t('qiblaDesc')}
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: AYARLAR */}
        {activeTab === 'settings' && (
          <div className="space-y-6 pt-4">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
              {t('settings')}
            </h2>

            {/* Dil Seçeneği */}
            <div className="space-y-2">
              <label htmlFor="language-select" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t('language')}
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>

            {/* Saat Formatı */}
            <div className="space-y-2">
              <label htmlFor="time-format-select" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t('timeFormat')}
              </label>
              <select
                id="time-format-select"
                value={timeFormat}
                onChange={(e) => setTimeFormat(e.target.value as any)}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="24h">{t('twentyFourHour')}</option>
                <option value="12h">{t('twelveHour')}</option>
              </select>
            </div>

            {/* Hesaplama Yöntemi */}
            <div className="space-y-2">
              <label htmlFor="calc-method-select" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t('calculationMethod')}
              </label>
              <select
                id="calc-method-select"
                value={calculationMethod}
                onChange={(e) => setCalculationMethod(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value={13}>{t('calcDiyanet')}</option>
                <option value={3}>{t('calcMWL')}</option>
                <option value={2}>{t('calcISNA')}</option>
                <option value={4}>{t('calcMakkah')}</option>
                <option value={5}>{t('calcEgypt')}</option>
              </select>
            </div>

            {/* Ses Ayarları Kartı */}
            <div className="space-y-4 rounded-xl bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {soundEnabled ? (
                    <Volume2 className="size-5 text-amber-400" />
                  ) : (
                    <VolumeX className="size-5 text-slate-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-white">{t('soundNotifications')}</p>
                    <p className="text-xs text-slate-400">{t('soundDesc')}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    soundEnabled ? 'bg-amber-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {soundEnabled && (
                <div className="pt-2 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <label htmlFor="volume-slider">{t('volumeLevel')}</label>
                    <span>%{Math.round(volume * 100)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      id="volume-slider"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={toggleTestSound}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                        isPlayingTest
                          ? 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30'
                          : 'bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                      }`}
                    >
                      {isPlayingTest ? (
                        <>
                          <Square className="size-3 fill-red-400" />
                          {t('stop')}
                        </>
                      ) : (
                        <>
                          <Play className="size-3 fill-amber-400" />
                          {t('testSound')}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Alt Gezinme Menüsü */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md border-t border-slate-800 bg-slate-950/90 backdrop-blur-lg">
        <div className="flex h-16 items-center justify-around px-2">
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
              activeTab === 'home' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HomeIcon className="size-5" />
            <span className="text-[10px] font-medium tracking-wide">{t('home')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('qibla')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
              activeTab === 'qibla' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="size-5" />
            <span className="text-[10px] font-medium tracking-wide">{t('qibla')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
              activeTab === 'settings' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="size-5" />
            <span className="text-[10px] font-medium tracking-wide">{t('settings')}</span>
          </button>
        </div>
      </nav>
    </div>
  )
}