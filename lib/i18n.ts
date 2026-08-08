export type LanguageCode = 'tr' | 'ar' | 'en'

/** BCP-47 locale tags used for Intl.DateTimeFormat (dates, 12h/24h clock, AM/PM) */
export const INTL_LOCALES: Record<LanguageCode, string> = {
  tr: 'tr-TR',
  ar: 'ar-SA',
  en: 'en-US',
}

export type Dictionary = {
  nav: { home: string; qibla: string; settings: string }
  hero: {
    nextPrayer: string
    at: string
    hrs: string
    min: string
    sec: string
    countdown: string
  }
  prayerList: { today: string; next: string; passed: string }
  prayers: {
    fajr: string
    sunrise: string
    dhuhr: string
    asr: string
    maghrib: string
    isha: string
  }
  qibla: {
    title: string
    subtitle: string
    direction: string
    instructions: string
  }
  settings: {
    title: string
    subtitle: string
    location: string
    detecting: string
    calculationMethod: string
    notifications: string
    notificationsOn: string
    timeFormat: string
    language: string
  }
  status: {
    locating: string
    loadingTimes: string
    preparing: string
    locationErrorTitle: string
    retry: string
    permissionDenied: string
    locationFailed: string
    fetchFailed: string
    unsupported: string
  }
  languageNames: { tr: string; ar: string; en: string }
}

export const translations: Record<LanguageCode, Dictionary> = {
  en: {
    nav: { home: 'Home', qibla: 'Qibla', settings: 'Settings' },
    hero: {
      nextPrayer: 'Next Prayer',
      at: 'at',
      hrs: 'Hrs',
      min: 'Min',
      sec: 'Sec',
      countdown: 'Time remaining until adhan',
    },
    prayerList: { today: 'Today', next: 'Next', passed: 'Passed' },
    prayers: {
      fajr: 'Fajr',
      sunrise: 'Sunrise',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
    },
    qibla: {
      title: 'Qibla Compass',
      subtitle: 'Facing the Kaaba in Makkah',
      direction: 'Qibla Direction',
      instructions:
        'Rotate your device to align the needle. Calibrate away from magnetic interference for best accuracy.',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Personalize your prayer experience',
      location: 'Location',
      detecting: 'Detecting…',
      calculationMethod: 'Calculation Method',
      notifications: 'Adhan Notifications',
      notificationsOn: 'On',
      timeFormat: 'Time Format',
      language: 'Language',
    },
    status: {
      locating: 'Getting your location…',
      loadingTimes: 'Fetching prayer times…',
      preparing: 'Preparing…',
      locationErrorTitle: "Couldn't get your location",
      retry: 'Try again',
      permissionDenied: 'We need location access to show accurate prayer times.',
      locationFailed: "Couldn't get your location. Please try again.",
      fetchFailed: "Couldn't load prayer times. Please try again.",
      unsupported: "This browser doesn't support location services.",
    },
    languageNames: { tr: 'Turkish', ar: 'Arabic', en: 'English' },
  },
  tr: {
    nav: { home: 'Ana Sayfa', qibla: 'Kıble', settings: 'Ayarlar' },
    hero: {
      nextPrayer: 'Sıradaki Vakit',
      at: 'saat',
      hrs: 'Saat',
      min: 'Dakika',
      sec: 'Saniye',
      countdown: 'Ezana kalan süre',
    },
    prayerList: { today: 'Bugün', next: 'Sıradaki', passed: 'Geçti' },
    prayers: {
      fajr: 'İmsak',
      sunrise: 'Güneş',
      dhuhr: 'Öğle',
      asr: 'İkindi',
      maghrib: 'Akşam',
      isha: 'Yatsı',
    },
    qibla: {
      title: 'Kıble Pusulası',
      subtitle: "Mekke'deki Kâbe yönü",
      direction: 'Kıble Yönü',
      instructions:
        'İbreyi hizalamak için cihazınızı çevirin. En iyi doğruluk için manyetik girişimden uzak durarak kalibre edin.',
    },
    settings: {
      title: 'Ayarlar',
      subtitle: 'Namaz deneyiminizi kişiselleştirin',
      location: 'Konum',
      detecting: 'Belirleniyor…',
      calculationMethod: 'Hesaplama Yöntemi',
      notifications: 'Ezan Bildirimleri',
      notificationsOn: 'Açık',
      timeFormat: 'Saat Formatı',
      language: 'Dil',
    },
    status: {
      locating: 'Konumunuz alınıyor…',
      loadingTimes: 'Namaz vakitleri getiriliyor…',
      preparing: 'Hazırlanıyor…',
      locationErrorTitle: 'Konum alınamadı',
      retry: 'Tekrar dene',
      permissionDenied: 'Doğru namaz vakitlerini gösterebilmemiz için konum izni gerekiyor.',
      locationFailed: 'Konumunuz alınamadı. Lütfen tekrar deneyin.',
      fetchFailed: 'Namaz vakitleri yüklenemedi. Lütfen tekrar deneyin.',
      unsupported: 'Bu tarayıcı konum servislerini desteklemiyor.',
    },
    languageNames: { tr: 'Türkçe', ar: 'Arapça', en: 'İngilizce' },
  },
  ar: {
    nav: { home: 'الرئيسية', qibla: 'القبلة', settings: 'الإعدادات' },
    hero: {
      nextPrayer: 'الصلاة القادمة',
      at: 'في',
      hrs: 'ساعة',
      min: 'دقيقة',
      sec: 'ثانية',
      countdown: 'الوقت المتبقي حتى الأذان',
    },
    prayerList: { today: 'اليوم', next: 'التالية', passed: 'انقضت' },
    prayers: {
      fajr: 'الفجر',
      sunrise: 'الشروق',
      dhuhr: 'الظهر',
      asr: 'العصر',
      maghrib: 'المغرب',
      isha: 'العشاء',
    },
    qibla: {
      title: 'بوصلة القبلة',
      subtitle: 'اتجاه الكعبة في مكة',
      direction: 'اتجاه القبلة',
      instructions: 'أدر جهازك لمحاذاة المؤشر. عايره بعيدًا عن أي تداخل مغناطيسي لأفضل دقة.',
    },
    settings: {
      title: 'الإعدادات',
      subtitle: 'خصص تجربة صلاتك',
      location: 'الموقع',
      detecting: 'جارٍ التحديد…',
      calculationMethod: 'طريقة الحساب',
      notifications: 'تنبيهات الأذان',
      notificationsOn: 'مفعّلة',
      timeFormat: 'صيغة الوقت',
      language: 'اللغة',
    },
    status: {
      locating: 'جارٍ تحديد موقعك…',
      loadingTimes: 'جارٍ جلب أوقات الصلاة…',
      preparing: 'جارٍ التحضير…',
      locationErrorTitle: 'تعذر تحديد موقعك',
      retry: 'إعادة المحاولة',
      permissionDenied: 'نحتاج إلى إذن الوصول للموقع لعرض أوقات صلاة دقيقة.',
      locationFailed: 'تعذر تحديد موقعك. يرجى المحاولة مرة أخرى.',
      fetchFailed: 'تعذر تحميل أوقات الصلاة. يرجى المحاولة مرة أخرى.',
      unsupported: 'هذا المتصفح لا يدعم خدمات الموقع.',
    },
    languageNames: { tr: 'التركية', ar: 'العربية', en: 'الإنجليزية' },
  },
}
