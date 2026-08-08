'use client'

import { VolumeX, X } from 'lucide-react'
import type { Prayer } from '@/lib/prayer-times'

type Props = {
  prayer: Prayer
  /** whether audio is actively playing (drives the animated wave) */
  playing: boolean
  onStop: () => void
  onDismiss: () => void
}

export function AzanAlert({ prayer, playing, onStop, onDismiss }: Props) {
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-[max(1rem,env(safe-area-inset-top))]"
      role="alert"
      aria-live="assertive"
    >
      <div className="w-full max-w-md duration-500 animate-in slide-in-from-top-6 fade-in">
        <div className="animate-gold-pulse relative overflow-hidden rounded-3xl border border-primary/40 bg-card p-5">
          {/* Soft gold glow backdrop */}
          <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gold-soft blur-2xl" />

          <div className="relative flex items-center gap-4">
            <AudioWave active={playing} />

            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Prayer Time</p>
              <p className="mt-0.5 truncate text-lg font-semibold text-foreground">
                It is time for {prayer.name}
              </p>
              <p className="font-serif text-sm text-muted-foreground">{prayer.arabic}</p>
            </div>

            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss"
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={onStop}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <VolumeX className="size-4" aria-hidden="true" />
            Mute / Stop Audio · Sesi Durdur
          </button>
        </div>
      </div>
    </div>
  )
}

function AudioWave({ active }: { active: boolean }) {
  const bars = [0, 1, 2, 3, 4]
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center gap-[3px] rounded-2xl bg-gold-soft"
      aria-hidden="true"
    >
      {bars.map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-primary"
          style={{
            height: active ? undefined : '20%',
            animation: active ? `wave 1s ease-in-out ${i * 0.12}s infinite` : 'none',
          }}
        />
      ))}
    </span>
  )
}
