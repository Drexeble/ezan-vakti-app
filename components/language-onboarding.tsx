'use client'

import Image from 'next/image'
import { Check, MoonStar } from 'lucide-react'

export type LanguageCode = 'tr' | 'ar' | 'en'

type LanguageOption = {
  code: LanguageCode
  native: string
  english: string
  flag: string
  flagAlt: string
  dir: 'ltr' | 'rtl'
}

const LANGUAGES: LanguageOption[] = [
  { code: 'tr', native: 'Türkçe', english: 'Turkish', flag: '/flags/tr.png', flagAlt: 'Flag of Turkey', dir: 'ltr' },
  { code: 'ar', native: 'العربية', english: 'Arabic', flag: '/flags/sa.png', flagAlt: 'Flag of Saudi Arabia', dir: 'rtl' },
  { code: 'en', native: 'English', english: 'English', flag: '/flags/gb.png', flagAlt: 'Flag of the United Kingdom', dir: 'ltr' },
]

export function LanguageOnboarding({
  onSelect,
}: {
  onSelect: (code: LanguageCode) => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pb-10 pt-16">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-16 items-center justify-center rounded-2xl border border-primary/25 bg-gold-soft animate-gold-pulse">
            <MoonStar className="size-8 text-primary" aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-balance text-2xl font-semibold text-foreground">
            Choose your language
          </h1>
          <p className="mt-2 text-balance text-sm leading-relaxed text-muted-foreground">
            اختر لغتك · Select your preferred language to continue
          </p>
        </div>

        <ul className="mt-10 flex flex-col gap-3">
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                onClick={() => onSelect(lang.code)}
                dir={lang.dir}
                className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-card/60 px-4 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card hover:shadow-[0_0_28px_-8px_var(--gold-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-0"
              >
                <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/70 ring-1 ring-transparent transition-all duration-300 group-hover:ring-primary/40">
                  <Image
                    src={lang.flag || "/placeholder.svg"}
                    alt={lang.flagAlt}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>

                <span className="flex min-w-0 flex-1 flex-col">
                  <span
                    className={`truncate text-lg font-semibold text-foreground ${
                      lang.code === 'ar' ? 'font-serif' : ''
                    }`}
                  >
                    {lang.native}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">{lang.english}</span>
                </span>

                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-transparent transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Check className="size-4" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-auto pt-10 text-center text-xs text-muted-foreground">
          You can change this later in Settings
        </p>
      </div>
    </div>
  )
}
