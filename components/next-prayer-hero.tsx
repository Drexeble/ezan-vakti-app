'use client'

import { useTranslation } from '@/hooks/use-translation'
import type { Prayer } from '@/lib/prayer-times'

type Props = {
  nextPrayer?: Prayer | null
  remainingSeconds: number
}

export function NextPrayerHero({ nextPrayer, remainingSeconds }: Props) {
  const { t } = useTranslation()

  // Saniyeyi HH:MM:SS formatına dönüştürme
  const formatCountdown = (totalSeconds: number) => {
    if (totalSeconds <= 0) return '00:00:00'
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-b from-amber-500/10 via-slate-900/60 to-slate-900/90 p-6 text-center shadow-xl backdrop-blur-md">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
        {nextPrayer ? t(nextPrayer.key) || nextPrayer.name : ''}
      </p>

      <div className="my-3 font-mono text-4xl font-extrabold tracking-tight text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]">
        {formatCountdown(remainingSeconds)}
      </div>

      <p className="text-xs text-slate-400 font-medium">
        {t('remainingTime')}
      </p>
    </div>
  )
}