'use client'

import { Home, Compass, Settings } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

type TabType = 'home' | 'qibla' | 'settings'

type Props = {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

export function BottomNav({ activeTab, setActiveTab }: Props) {
  const { t } = useTranslation()

  const tabs = [
    { id: 'home' as TabType, label: t('home') || 'Ana Sayfa', icon: Home },
    { id: 'qibla' as TabType, label: t('qibla') || 'Kıble', icon: Compass },
    { id: 'settings' as TabType, label: t('settings') || 'Ayarlar', icon: Settings },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md border-t border-slate-800 bg-slate-950/90 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-around px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
                isActive ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="size-5" />
              <span className="text-[10px] font-medium tracking-wide">
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}