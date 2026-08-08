export type CalculationMethod = 13 | 3 | 2 | 4 | 5

export const CALCULATION_METHODS = [
  { id: 13, name: 'Diyanet İşleri Başkanlığı' },
  { id: 3, name: 'Muslim World League' },
  { id: 2, name: 'ISNA (North America)' },
  { id: 4, name: 'Umm Al-Qura, Makkah' },
  { id: 5, name: 'Egyptian General Authority' },
]

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const cacheKey = `geo_${lat.toFixed(2)}_${lng.toFixed(2)}`
  const cachedCity = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null
  if (cachedCity) return cachedCity

  try {
    // Ücretsiz ve CORS engeli olmayan BigDataCloud API
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=tr`
    )

    if (res.ok) {
      const data = await res.json()
      const city = data.city || data.principalSubdivision || data.locality || 'İstanbul'
      if (typeof window !== 'undefined') localStorage.setItem(cacheKey, city)
      return city
    }
  } catch {
    // İkinci istek başarısız olursa varsayılan şehre düş
  }

  return 'İstanbul'
}

export async function fetchAladhanTimings(
  lat: number,
  lng: number,
  method: CalculationMethod = 13
) {
  try {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
    const dateStr = `${day}-${month}-${year}`

    const res = await fetch(
      `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=${method}`
    )

    if (!res.ok) throw new Error('Namaz vakitleri çekilemedi')

    const json = await res.json()
    return json.data
  } catch (err) {
    console.error('Namaz vakitleri alınırken hata oluştu:', err)
    return null
  }
}

export const getPrayerTimes = fetchAladhanTimings
export const getCityFromCoords = reverseGeocode