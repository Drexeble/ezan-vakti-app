'use client'

import { useSettings } from './use-settings'

type Language = 'tr' | 'en' | 'ar'

const translations: Record<Language, Record<string, string>> = {
  tr: {
    // Navigasyon & Genel
    home: 'Ana Sayfa',
    qibla: 'Kıble',
    settings: 'Ayarlar',
    today: 'Bugün',
    remainingTime: 'Kalan Süre',
    nextPrayer: 'Sonraki Vakit',
    qiblaDesc: 'Okun gösterdiği simgeye doğru yönelin. Mobil cihazlarda canlı döner, bilgisayarda sabittir.',
    qiblaTitle: 'Kıble Yönü',

    // Vakitler
    fajr: 'İmsak',
    Fajr: 'İmsak',
    sunrise: 'Güneş',
    Sunrise: 'Güneş',
    dhuhr: 'Öğle',
    Dhuhr: 'Öğle',
    asr: 'İkindi',
    Asr: 'İkindi',
    maghrib: 'Akşam',
    Maghrib: 'Akşam',
    isha: 'Yatsı',
    Isha: 'Yatsı',

    // Ayarlar & Hesaplama Yöntemleri
    language: 'Dil / Language',
    timeFormat: 'Saat Formatı',
    twentyFourHour: '24 Saat',
    twelveHour: '12 Saat (AM/PM)',
    calculationMethod: 'Hesaplama Yöntemi',
    calcDiyanet: 'Diyanet İşleri Başkanlığı (Türkiye)',
    calcMWL: 'Müslüman Dünya Ligi (MWL)',
    calcISNA: 'Kuzey Amerika İslam Toplumu (ISNA)',
    calcMakkah: "Ümmü'l-Kura Üniversitesi, Mekke",
    calcEgypt: 'Mısır Genel Heyeti',

    // Ses Ayarları
    soundNotifications: 'Bildirim Sesleri',
    soundDesc: 'Vakit girdiğinde 1 dk ezan oku',
    volumeLevel: 'Ses Yüksekliği',
    testSound: 'Test Et',
    stop: 'Durdur',
    stopAzan: 'Ezanı Kapat',
  },
  en: {
    home: 'Home',
    qibla: 'Qibla',
    settings: 'Settings',
    today: 'Today',
    remainingTime: 'Remaining Time',
    nextPrayer: 'Next Prayer',
    qiblaDesc: 'Point towards the icon indicated by the arrow. Rotates live on mobile devices, fixed on computers.',
    qiblaTitle: 'Qibla Direction',

    fajr: 'Fajr',
    Fajr: 'Fajr',
    sunrise: 'Sunrise',
    Sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    Dhuhr: 'Dhuhr',
    asr: 'Asr',
    Asr: 'Asr',
    maghrib: 'Maghrib',
    Maghrib: 'Maghrib',
    isha: 'Isha',
    Isha: 'Isha',

    language: 'Language',
    timeFormat: 'Time Format',
    twentyFourHour: '24-Hour',
    twelveHour: '12-Hour (AM/PM)',
    calculationMethod: 'Calculation Method',
    calcDiyanet: 'Diyanet Affairs (Turkey)',
    calcMWL: 'Muslim World League (MWL)',
    calcISNA: 'Islamic Society of North America (ISNA)',
    calcMakkah: 'Umm Al-Qura University, Makkah',
    calcEgypt: 'Egyptian General Authority',

    soundNotifications: 'Sound Notifications',
    soundDesc: 'Play Adhan for 1 min when prayer time starts',
    volumeLevel: 'Volume',
    testSound: 'Test',
    stop: 'Stop',
    stopAzan: 'Stop Adhan',
  },
  ar: {
    home: 'الرئيسية',
    qibla: 'القبلة',
    settings: 'الإعدادات',
    today: 'اليوم',
    remainingTime: 'الوقت المتبقي',
    nextPrayer: 'الصلاة القادمة',
    qiblaDesc: 'اتجه نحو الأيقونة التي يشير إليها السهم. يدور مباشرة على الهواتف، وثابت على أجهزة الكمبيوتر.',
    qiblaTitle: 'اتجاه القبلة',

    fajr: 'الفجر',
    Fajr: 'الفجر',
    sunrise: 'الشروق',
    Sunrise: 'الشروق',
    dhuhr: 'الظهر',
    Dhuhr: 'الظهر',
    asr: 'العصر',
    Asr: 'العصر',
    maghrib: 'المغرب',
    Maghrib: 'المغرب',
    isha: 'العشاء',
    Isha: 'العشاء',

    language: 'اللغة / Language',
    timeFormat: 'تنسيق الوقت',
    twentyFourHour: '24 ساعة',
    twelveHour: '12 ساعة (AM/PM)',
    calculationMethod: 'طريقة الحساب',
    calcDiyanet: 'رئاسة الشؤون الدينية (تركيا)',
    calcMWL: 'رابطة العالم الإسلامي',
    calcISNA: 'الجمعية الإسلامية لشمال أمريكا',
    calcMakkah: 'جامعة أم القرى، مكة المكرمة',
    calcEgypt: 'الهيئة المصرية العامة للمساحة',

    soundNotifications: 'أصوات التنبيهات',
    soundDesc: 'تشغيل الأذان لمدة دقيقة عند دخول الوقت',
    volumeLevel: 'مستوى الصوت',
    testSound: 'تجربة',
    stop: 'إيقاف',
    stopAzan: 'إيقاف الأذان',
  },
}

export function useTranslation() {
  const { language } = useSettings()

  const t = (key: string): string => {
    if (!key) return ''
    const currentLang = (language as Language) || 'tr'
    
    return (
      translations[currentLang]?.[key] ||
      translations[currentLang]?.[key.toLowerCase()] ||
      translations['tr']?.[key] ||
      key
    )
  }

  return { t, language }
}