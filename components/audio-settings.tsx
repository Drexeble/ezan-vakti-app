'use client'

import { useState } from 'react'
import { Volume2, VolumeX, Play, Square, Bell } from 'lucide-react'
import type { AudioSettings } from '@/lib/azan-audio'

type Props = {
  settings: AudioSettings
  onChange: (next: AudioSettings) => void
}

export function AudioSettingsCard({ settings, onChange }: Props) {
  const [isPlayingTest, setIsPlayingTest] = useState(false)
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null)

  const toggleEnabled = () => {
    onChange({ ...settings, enabled: !settings.enabled })
  }

  const toggleMuted = () => {
    onChange({ ...settings, muted: !settings.muted })
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value)
    onChange({ ...settings, volume })
    if (audioRef) {
      audioRef.volume = volume
    }
  }

  const toggleTestPlay = () => {
    if (isPlayingTest && audioRef) {
      audioRef.pause()
      audioRef.currentTime = 0
      setIsPlayingTest(false)
      setAudioRef(null)
      return
    }

    const audio = new Audio('/audio/azan-abdulbasit.mp3')
    audio.volume = settings.muted ? 0 : settings.volume
    setAudioRef(audio)

    audio
      .play()
      .then(() => {
        setIsPlayingTest(true)
      })
      .catch((err) => {
        console.warn('Test sesi çalınamadı:', err)
        setIsPlayingTest(false)
      })

    audio.onended = () => {
      setIsPlayingTest(false)
      setAudioRef(null)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-5">
      {/* Başlık ve Ana Bildirim Anahtarı */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Bell className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100">Ezan Bildirimi</p>
            <p className="text-xs text-slate-400">Vakit geldiğinde ezan oku</p>
          </div>
        </div>

        <button
          onClick={toggleEnabled}
          type="button"
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.enabled ? 'bg-amber-500' : 'bg-slate-700'
          }`}
        >
          <span
            className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
              settings.enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {settings.enabled && (
        <div className="space-y-4 pt-2 border-t border-slate-800">
          {/* Ezan İmam Bilgisi */}
          <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
            <span>Ezan Sesi</span>
            <span className="font-semibold text-amber-400">Abdülbasit Abdüssamed</span>
          </div>

          {/* Ses Seviyesi ve Mute */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Ses Seviyesi</span>
              <span>{settings.muted ? '%0' : `${Math.round(settings.volume * 100)}%`}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMuted}
                type="button"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                {settings.muted || settings.volume === 0 ? (
                  <VolumeX className="size-5 text-red-400" />
                ) : (
                  <Volume2 className="size-5 text-amber-400" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.muted ? 0 : settings.volume}
                onChange={handleVolumeChange}
                className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Test Çalma Butonu */}
          <button
            onClick={toggleTestPlay}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700/80 text-amber-400 border border-amber-500/20 rounded-xl text-xs font-medium transition-all"
          >
            {isPlayingTest ? (
              <>
                <Square className="size-4 fill-amber-400" />
                Sesi Durdur
              </>
            ) : (
              <>
                <Play className="size-4 fill-amber-400" />
                Ezanı Test Et
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}