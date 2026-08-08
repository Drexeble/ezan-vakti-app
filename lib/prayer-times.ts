export type PrayerKey = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'

export interface Prayer {
  key: PrayerKey
  name: string
  time: string
}

export interface HijriInfo {
  day: string
  month: {
    number: number
    en: string
    ar: string
  }
  year: string
}

export const PRAYER_ORDER: PrayerKey[] = [
  'fajr',
  'sunrise',
  'dhuhr',
  'asr',
  'maghrib',
  'isha',
]

const PRAYER_NAMES: Record<PrayerKey, string> = {
  fajr: 'İmsak',
  sunrise: 'Güneş',
  dhuhr: 'Öğle',
  asr: 'İkindi',
  maghrib: 'Akşam',
  isha: 'Yatsı',
}

export function parseAladhanClock(timings: Record<string, string>): Prayer[] {
  if (!timings) return []

  const keyMap: Record<string, PrayerKey> = {
    Fajr: 'fajr',
    Sunrise: 'sunrise',
    Dhuhr: 'dhuhr',
    Asr: 'asr',
    Maghrib: 'maghrib',
    Isha: 'isha',
  }

  return PRAYER_ORDER.map((key) => {
    const rawKey = Object.keys(keyMap).find((k) => keyMap[k] === key)
    const rawTime = rawKey ? timings[rawKey] : '00:00'
    const cleanTime = rawTime ? rawTime.split(' ')[0] : '00:00'

    return {
      key,
      name: PRAYER_NAMES[key],
      time: cleanTime,
    }
  })
}

export function getPrayerStatus(prayers: Prayer[]) {
  if (!prayers || prayers.length === 0) {
    return { remainingSeconds: 0, nextPrayer: null }
  }

  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const currentSeconds = now.getSeconds()

  let nextPrayer: Prayer | null = null
  let diffMinutes = 0

  for (const prayer of prayers) {
    const [h, m] = prayer.time.split(':').map(Number)
    const prayerMinutes = h * 60 + m

    if (prayerMinutes > currentMinutes) {
      nextPrayer = prayer
      diffMinutes = prayerMinutes - currentMinutes
      break
    }
  }

  if (!nextPrayer) {
    nextPrayer = prayers[0]
    const [h, m] = nextPrayer.time.split(':').map(Number)
    const prayerMinutes = h * 60 + m
    diffMinutes = 24 * 60 - currentMinutes + prayerMinutes
  }

  const remainingSeconds = Math.max(0, diffMinutes * 60 - currentSeconds)

  return { remainingSeconds, nextPrayer }
}

export function formatHijriDate(
  hijri: HijriInfo | null | undefined,
  lang: 'tr' | 'en' | 'ar' = 'tr'
): string {
  if (!hijri) return ''

  const months: Record<string, { tr: string; en: string; ar: string }> = {
    '1': { tr: 'Muharrem', en: 'Muharram', ar: 'محرم' },
    '2': { tr: 'Safar', en: 'Safar', ar: 'صفر' },
    '3': { tr: 'Rebiülevvel', en: 'Rabi al-Awwal', ar: 'ربيع الأول' },
    '4': { tr: 'Rebiülahir', en: 'Rabi al-Thani', ar: 'ربيع الثاني' },
    '5': { tr: 'Cemaziyelevvel', en: 'Jumada al-Awwal', ar: 'جمادى الأولى' },
    '6': { tr: 'Cemaziyelahir', en: 'Jumada al-Thani', ar: 'جمادى الثانية' },
    '7': { tr: 'Recep', en: 'Rajab', ar: 'رجب' },
    '8': { tr: 'Şaban', en: "Sha'ban", ar: 'شعبان' },
    '9': { tr: 'Ramazan', en: 'Ramadan', ar: 'رمضان' },
    '10': { tr: 'Şevval', en: 'Shawwal', ar: 'شوال' },
    '11': { tr: 'Zilkade', en: "Dhu al-Qi'dah", ar: 'ذو القعدة' },
    '12': { tr: 'Zilhicce', en: 'Dhu al-Hijjah', ar: 'ذو الحجة' },
  }

  const monthNum = String(hijri.month?.number || '1')
  const monthName = months[monthNum]?.[lang] || hijri.month?.en || ''

  return `${hijri.day} ${monthName} ${hijri.year}`
}