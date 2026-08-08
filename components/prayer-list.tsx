'use client'

import { useSettings } from '@/hooks/use-settings'
import { useTranslation } from '@/hooks/use-translation'
import type { Prayer } from '@/lib/prayer-times'

type Props = {
  prayers: Prayer[]
  nextPrayerKey?: string
}

export function PrayerList({ prayers, nextPrayerKey }: Props) {
  const { timeFormat } = useSettings()
  const { t } = useTranslation()

  // Saat formatlama fonksiyonu (12h / 24h desteği)
  const formatTime = (timeStr: string) => {
    if (!timeStr) return ''
    const [hoursStr, minutesStr] = timeStr.split(':')
    let hours = parseInt(hoursStr, 10)
    const minutes = minutesStr ? minutesStr.substring(0, 2) : '00'

    if (timeFormat === '12h') {
      const period = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12
      const formattedHours = hours < 10 ? `0${hours}` : hours
      return `${formattedHours}:${minutes} ${period}`
    }

    const formattedHours = hours < 10 ? `0${hours}` : hours
    return `${formattedHours}:${minutes}`
  }

  return (
    <section className="mt-8 px-6" aria-label={t('today')}>
      <h2 className="mb-3 px-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
        {t('today')}
      </h2>

      <div className="space-y-2">
        {prayers.map((prayer) => {
          const isNext = prayer.key === nextPrayerKey

          return (
            <div
              key={prayer.key}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                isNext
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-200'
              }`}
            >
              <span className="font-medium text-sm">
                {t(prayer.key) || prayer.name}
              </span>

              <span className="font-mono text-sm font-semibold">
                {formatTime(prayer.time)}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}