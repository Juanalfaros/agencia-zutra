import React from 'react'
import { Stack, Text, Flex, Heading } from '@sanity/ui'
import {
  ClipboardText,
  Article,
  Briefcase,
  Star,
  Package,
  CurrencyDollar,
  ArrowRight,
} from '@phosphor-icons/react'
import { useRouter } from 'sanity/router'
import './QuickLinks.css'

const ACCENT_COLORS: Record<string, { bg: string; color: string }> = {
  violet: { bg: 'rgba(139,92,246,0.12)', color: '#a78bfa' },
  blue:   { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa' },
  green:  { bg: 'rgba(34,197,94,0.12)',   color: '#4ade80' },
  amber:  { bg: 'rgba(245,158,11,0.12)',  color: '#fbbf24' },
  rose:   { bg: 'rgba(244,63,94,0.12)',   color: '#fb7185' },
  cyan:   { bg: 'rgba(6,182,212,0.12)',   color: '#22d3ee' },
}

const links = [
  { label: 'Nuevo Reporte',    icon: ClipboardText,  type: 'auditReport', color: 'violet' },
  { label: 'Nuevo Artículo',   icon: Article,        type: 'post',        color: 'blue'   },
  { label: 'Nuevo Servicio',   icon: Briefcase,      type: 'service',     color: 'cyan'   },
  { label: 'Nuevo Recurso',    icon: Package,        type: 'resource',    color: 'green'  },
  { label: 'Nuevo Plan',       icon: CurrencyDollar, type: 'plan',        color: 'amber'  },
  { label: 'Nuevo Testimonio', icon: Star,           type: 'testimonial', color: 'rose'   },
]

export function QuickLinks() {
  const { navigateIntent } = useRouter() as any

  return (
    <Stack space={4}>
      <Heading as="h3" size={1} className="quick-links-heading">
        Acciones Rápidas
      </Heading>

      <Stack space={1}>
        {links.map((link) => {
          const palette = ACCENT_COLORS[link.color]
          return (
            <React.Fragment key={link.type}>
              <button
                type="button"
                className="quick-link-btn"
                onClick={() => navigateIntent('create', { type: link.type })}
              >
                <Flex
                  align="center"
                  justify="center"
                  className="quick-link-icon"
                  style={{ background: palette.bg }}
                >
                  <link.icon size={16} weight="fill" color={palette.color} />
                </Flex>

                <Text size={1} weight="medium" className="quick-link-label">
                  {link.label}
                </Text>

                <ArrowRight
                  size={14}
                  weight="bold"
                  color={palette.color}
                  className="quick-link-arrow"
                />
              </button>
            </React.Fragment>
          )
        })}
      </Stack>
    </Stack>
  )
}
