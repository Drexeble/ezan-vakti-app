import { MapPin, Moon } from 'lucide-react'

type LocationHeaderProps = {
  location: string
  hijriDate: string
  gregorianDate: string
}

export function LocationHeader({ location, hijriDate, gregorianDate }: LocationHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4 px-6 pt-8">
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-primary">
          <MapPin className="size-4" aria-hidden="true" />
          <span className="text-sm font-medium tracking-wide text-foreground">{location}</span>
        </div>
        <p className="text-xs text-muted-foreground">{gregorianDate}</p>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur">
        <Moon className="size-3.5 text-primary" aria-hidden="true" />
        <span className="text-xs font-medium text-foreground">{hijriDate}</span>
      </div>
    </header>
  )
}
