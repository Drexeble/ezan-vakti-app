import { Loader2, MapPinOff, RotateCw } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'
import type { PrayerTimesErrorCode } from '@/hooks/use-prayer-times'

export function LocatingScreen({ label }: { label?: string }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-24 pt-12 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl border border-primary/25 bg-gold-soft">
        <Loader2 className="size-6 animate-spin text-primary" aria-hidden="true" />
      </span>
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </main>
  )
}

const ERROR_MESSAGE_KEY: Record<PrayerTimesErrorCode, 'permissionDenied' | 'locationFailed' | 'fetchFailed' | 'unsupported'> = {
  'permission-denied': 'permissionDenied',
  'location-failed': 'locationFailed',
  'fetch-failed': 'fetchFailed',
  unsupported: 'unsupported',
}

export function PrayerErrorScreen({
  errorCode,
  onRetry,
}: {
  errorCode: PrayerTimesErrorCode
  onRetry: () => void
}) {
  const { t } = useTranslation()
  const message = t.status[ERROR_MESSAGE_KEY[errorCode]]

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-24 pt-12 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl border border-border bg-card/60">
        <MapPinOff className="size-6 text-muted-foreground" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-foreground">{t.status.locationErrorTitle}</h2>
        <p className="max-w-xs text-balance text-sm text-muted-foreground">{message}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-gold-soft px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/60"
      >
        <RotateCw className="size-3.5" aria-hidden="true" />
        {t.status.retry}
      </button>
    </main>
  )
}
