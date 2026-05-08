import React, {useState} from 'react'
import {set, unset} from 'sanity'
import type {StringInputProps} from 'sanity'
import {
  RocketLaunch, Wrench, Lightning, Target, ShieldCheck, Globe, TrendUp, ChartBar,
  Code, PaintBrush, DeviceMobile, Desktop, CurrencyCircleDollar, Clock, Users,
  Star, CheckCircle, Package, Robot, Cloud, Database, Lock, Leaf, Storefront,
  Handshake, GraduationCap, Megaphone, Gear, MagicWand, ArrowsClockwise,
  Lightbulb, Buildings, Truck, Cpu, Wallet, CalendarCheck, ChartLine,
  PuzzlePiece, Headset, Scales,
} from '@phosphor-icons/react'

const ICONS: {label: string; cls: string; Component: React.ElementType}[] = [
  {label: 'Lanzamiento',    cls: 'ph-rocket-launch',          Component: RocketLaunch},
  {label: 'Herramienta',    cls: 'ph-wrench',                  Component: Wrench},
  {label: 'Rápido',         cls: 'ph-lightning',               Component: Lightning},
  {label: 'Objetivo',       cls: 'ph-target',                  Component: Target},
  {label: 'Seguridad',      cls: 'ph-shield-check',            Component: ShieldCheck},
  {label: 'Web',            cls: 'ph-globe',                   Component: Globe},
  {label: 'Crecimiento',    cls: 'ph-trend-up',                Component: TrendUp},
  {label: 'Gráfico barras', cls: 'ph-chart-bar',               Component: ChartBar},
  {label: 'Código',         cls: 'ph-code',                    Component: Code},
  {label: 'Diseño',         cls: 'ph-paint-brush',             Component: PaintBrush},
  {label: 'Mobile',         cls: 'ph-device-mobile',           Component: DeviceMobile},
  {label: 'Desktop',        cls: 'ph-desktop',                 Component: Desktop},
  {label: 'Precio',         cls: 'ph-currency-circle-dollar',  Component: CurrencyCircleDollar},
  {label: 'Tiempo',         cls: 'ph-clock',                   Component: Clock},
  {label: 'Equipo',         cls: 'ph-users',                   Component: Users},
  {label: 'Premium',        cls: 'ph-star',                    Component: Star},
  {label: 'Completado',     cls: 'ph-check-circle',            Component: CheckCircle},
  {label: 'Paquete',        cls: 'ph-package',                 Component: Package},
  {label: 'Automatización', cls: 'ph-robot',                   Component: Robot},
  {label: 'Cloud',          cls: 'ph-cloud',                   Component: Cloud},
  {label: 'Base de datos',  cls: 'ph-database',                Component: Database},
  {label: 'Candado',        cls: 'ph-lock',                    Component: Lock},
  {label: 'Eco',            cls: 'ph-leaf',                    Component: Leaf},
  {label: 'Tienda',         cls: 'ph-storefront',              Component: Storefront},
  {label: 'Alianza',        cls: 'ph-handshake',               Component: Handshake},
  {label: 'Capacitación',   cls: 'ph-graduation-cap',          Component: GraduationCap},
  {label: 'Marketing',      cls: 'ph-megaphone',               Component: Megaphone},
  {label: 'Configuración',  cls: 'ph-gear',                    Component: Gear},
  {label: 'Personalizado',  cls: 'ph-magic-wand',              Component: MagicWand},
  {label: 'Escalable',      cls: 'ph-arrows-clockwise',        Component: ArrowsClockwise},
  {label: 'Idea',           cls: 'ph-lightbulb',               Component: Lightbulb},
  {label: 'Empresa',        cls: 'ph-buildings',               Component: Buildings},
  {label: 'Logística',      cls: 'ph-truck',                   Component: Truck},
  {label: 'Tecnología',     cls: 'ph-cpu',                     Component: Cpu},
  {label: 'Billetera',      cls: 'ph-wallet',                  Component: Wallet},
  {label: 'Calendario',     cls: 'ph-calendar-check',          Component: CalendarCheck},
  {label: 'Métricas',       cls: 'ph-chart-line',              Component: ChartLine},
  {label: 'Integración',    cls: 'ph-puzzle-piece',            Component: PuzzlePiece},
  {label: 'Soporte',        cls: 'ph-headset',                 Component: Headset},
  {label: 'Balance',        cls: 'ph-scales',                  Component: Scales},
]

export function PhosphorIconPicker(props: StringInputProps) {
  const {value, onChange} = props
  const [search, setSearch] = useState('')

  const filtered = ICONS.filter(
    (i) =>
      !search ||
      i.label.toLowerCase().includes(search.toLowerCase()) ||
      i.cls.includes(search.toLowerCase()),
  )

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
      <input
        type="text"
        placeholder="Buscar icono..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          border: '1px solid var(--card-border-color)',
          background: 'var(--card-bg)',
          color: 'inherit',
          fontSize: '0.875rem',
          width: '100%',
        }}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
          gap: '0.5rem',
          maxHeight: '320px',
          overflowY: 'auto',
          padding: '0.25rem',
        }}
      >
        {filtered.map(({label, cls, Component}) => {
          const isSelected = value === cls
          return (
            <button
              key={cls}
              type="button"
              title={label}
              onClick={() => onChange(isSelected ? unset() : set(cls))}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.5rem 0.25rem',
                borderRadius: '0.5rem',
                border: isSelected
                  ? '2px solid var(--card-focus-ring-color, #7C5CFC)'
                  : '1px solid var(--card-border-color)',
                background: isSelected
                  ? 'rgba(124,92,252,0.12)'
                  : 'var(--card-bg)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <Component size={24} weight="duotone" />
              <span style={{fontSize: '0.6rem', color: 'var(--card-muted-fg-color)', textAlign: 'center', lineHeight: 1.2}}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
      {value && (
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--card-muted-fg-color)'}}>
          <span>Seleccionado:</span>
          <code style={{background: 'var(--card-bg)', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', border: '1px solid var(--card-border-color)'}}>{value}</code>
        </div>
      )}
    </div>
  )
}
