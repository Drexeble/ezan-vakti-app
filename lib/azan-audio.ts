export type AzanType = 'abdulbasit'

export interface AudioSettings {
  enabled: boolean
  muted: boolean
  volume: number
  type: AzanType
}

export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  enabled: true,
  muted: false,
  volume: 0.8,
  type: 'abdulbasit',
}

const STORAGE_KEY = 'azan_audio_settings'

export function loadAudioSettings(): AudioSettings {
  if (typeof window === 'undefined') return DEFAULT_AUDIO_SETTINGS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_AUDIO_SETTINGS
    const parsed = JSON.parse(raw)
    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : DEFAULT_AUDIO_SETTINGS.enabled,
      muted: typeof parsed.muted === 'boolean' ? parsed.muted : DEFAULT_AUDIO_SETTINGS.muted,
      volume: typeof parsed.volume === 'number' ? parsed.volume : DEFAULT_AUDIO_SETTINGS.volume,
      type: 'abdulbasit',
    }
  } catch {
    return DEFAULT_AUDIO_SETTINGS
  }
}

export function saveAudioSettings(settings: AudioSettings): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (e) {
    console.error('Audio settings kaydetme hatası:', e)
  }
}