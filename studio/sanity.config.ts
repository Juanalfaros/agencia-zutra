import {defineConfig} from 'sanity'
import React from 'react'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import type {StructureBuilder} from 'sanity/structure'
import {injectGlobalStyles} from './components/GlobalStyle'

injectGlobalStyles()

import {ZutraLogo} from './components/ZutraLogo'
import {zutraDashboardPlugin} from './plugins/zutraDashboard'
import {StatusBadge} from './documentBadges/statusBadge'
import {CopyPresentationUrlAction} from './documentActions/copyPresentationUrl'
import {ChangeStatusToPublishedAction} from './documentActions/changeStatusToPublished'
import {
  ChartBar,
  ClipboardText,
  Presentation,
  Wrench,
  Globe,
  ArrowsOut,
  Briefcase,
  Trophy,
  Package,
  Star,
  PencilSimpleLine,
  Article,
  Tag,
  Gear,
  UserCircle,
  Receipt,
  CurrencyDollar,
} from '@phosphor-icons/react'

const StableIcons = {
  ChartBar: () => React.createElement(ChartBar, {size: 18, weight: 'duotone'}),
  ClipboardText: () => React.createElement(ClipboardText, {size: 18, weight: 'duotone'}),
  Presentation: () => React.createElement(Presentation, {size: 18, weight: 'duotone'}),
  Wrench: () => React.createElement(Wrench, {size: 18, weight: 'duotone'}),
  Globe: () => React.createElement(Globe, {size: 18, weight: 'duotone'}),
  ArrowsOut: () => React.createElement(ArrowsOut, {size: 18, weight: 'duotone'}),
  Briefcase: () => React.createElement(Briefcase, {size: 18, weight: 'duotone'}),
  Trophy: () => React.createElement(Trophy, {size: 18, weight: 'duotone'}),
  Package: () => React.createElement(Package, {size: 18, weight: 'duotone'}),
  Star: () => React.createElement(Star, {size: 18, weight: 'duotone'}),
  PencilSimpleLine: () => React.createElement(PencilSimpleLine, {size: 18, weight: 'duotone'}),
  Article: () => React.createElement(Article, {size: 18, weight: 'duotone'}),
  Tag: () => React.createElement(Tag, {size: 18, weight: 'duotone'}),
  Gear: () => React.createElement(Gear, {size: 18, weight: 'duotone'}),
  UserCircle: () => React.createElement(UserCircle, {size: 18, weight: 'duotone'}),
  Receipt: () => React.createElement(Receipt, {size: 18, weight: 'duotone'}),
  CurrencyDollar: () => React.createElement(CurrencyDollar, {size: 18, weight: 'duotone'}),
}

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Zutra Studio')
    .items([
      // ─── CONSULTORÍA ──────────────────────────────────────────────
      S.listItem()
        .title('Consultoría')
        .icon(StableIcons.ChartBar)
        .child(
          S.list()
            .title('Consultoría')
            .items([
              S.listItem()
                .title('Reportes de Auditoría')
                .icon(StableIcons.ClipboardText)
                .child(
                  S.documentTypeList('auditReport')
                    .title('Reportes de Auditoría')
                    .defaultOrdering([{field: 'date', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Diapositivas')
                .icon(StableIcons.Presentation)
                .child(
                  S.documentTypeList('consultoriaSlide')
                    .title('Diapositivas')
                    .defaultOrdering([{field: 'order', direction: 'asc'}]),
                ),
              S.listItem()
                .title('Opciones de Propuesta')
                .icon(StableIcons.Wrench)
                .child(S.documentTypeList('slideOption').title('Opciones de Propuesta')),
            ]),
        ),

      S.divider(),

      // ─── SITIO WEB ────────────────────────────────────────────────
      S.listItem()
        .title('Sitio Web')
        .icon(StableIcons.Globe)
        .child(
          S.list()
            .title('Sitio Web')
            .items([
              S.listItem()
                .title('Hero — Slides de Portada')
                .icon(StableIcons.ArrowsOut)
                .child(
                  S.documentTypeList('heroSlide')
                    .title('Hero Slides')
                    .defaultOrdering([{field: 'order', direction: 'asc'}]),
                ),
              S.divider(),
              S.listItem()
                .title('Servicios')
                .icon(StableIcons.Briefcase)
                .child(
                  S.documentTypeList('service')
                    .title('Servicios')
                    .defaultOrdering([{field: 'order', direction: 'asc'}]),
                ),
              S.listItem()
                .title('Portfolio — Casos')
                .icon(StableIcons.Trophy)
                .child(
                  S.documentTypeList('caseStudy')
                    .title('Casos de Portfolio')
                    .defaultOrdering([{field: 'order', direction: 'asc'}]),
                ),
              S.listItem()
                .title('Recursos Digitales')
                .icon(StableIcons.Package)
                .child(
                  S.documentTypeList('resource')
                    .title('Recursos Digitales')
                    .defaultOrdering([{field: 'order', direction: 'asc'}]),
                ),
              S.divider(),
              S.listItem()
                .title('Testimonios')
                .icon(StableIcons.Star)
                .child(
                  S.documentTypeList('testimonial')
                    .title('Testimonios')
                    .defaultOrdering([{field: 'order', direction: 'asc'}]),
                ),
              S.divider(),
              S.listItem()
                .title('Planes de Precios')
                .icon(StableIcons.CurrencyDollar)
                .child(
                  S.documentTypeList('plan')
                    .title('Planes de Precios')
                    .defaultOrdering([{field: 'order', direction: 'asc'}]),
                ),
            ]),
        ),

      S.divider(),

      // ─── BLOG ─────────────────────────────────────────────────────
      S.listItem()
        .title('Blog')
        .icon(StableIcons.PencilSimpleLine)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Artículos')
                .icon(StableIcons.Article)
                .child(
                  S.documentTypeList('post')
                    .title('Artículos')
                    .defaultOrdering([{field: 'publishDate', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Categorías')
                .icon(StableIcons.Tag)
                .child(
                  S.documentTypeList('category')
                    .title('Categorías')
                    .defaultOrdering([{field: 'order', direction: 'asc'}]),
                ),
            ]),
        ),

      S.divider(),

      // ─── CONFIGURACIÓN ────────────────────────────────────────────
      S.listItem()
        .title('Configuración')
        .icon(StableIcons.Gear)
        .child(
          S.list()
            .title('Configuración')
            .items([
              S.listItem()
                .title('Autores / Equipo')
                .icon(StableIcons.UserCircle)
                .child(S.documentTypeList('author').title('Autores')),
            ]),
        ),

      S.divider(),

      // ─── ADMINISTRACIÓN ───────────────────────────────────────────
      S.listItem()
        .title('Administración')
        .icon(StableIcons.Receipt)
        .child(
          S.list()
            .title('Administración')
            .items([
              S.listItem()
                .title('Facturas')
                .icon(StableIcons.Receipt)
                .child(
                  S.documentTypeList('invoice')
                    .title('Facturas')
                    .defaultOrdering([{field: 'date', direction: 'desc'}]),
                ),
            ]),
        ),
    ])

export default defineConfig({
  name: 'zutra',
  title: 'Zutra Studio',

  projectId: 'elgye97d',
  dataset: 'production',
  apiVersion: '2024-01-01',
  icon: ZutraLogo,

  studio: {
    components: {
      logo: ZutraLogo,
    },
  },

  plugins: [
    zutraDashboardPlugin(),
    structureTool({structure}),
    visionTool({defaultApiVersion: '2024-04-28'}),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    badges: (prev, {schemaType}) =>
      ['auditReport', 'post', 'service'].includes(schemaType) ? [StatusBadge, ...prev] : prev,
    actions: (prev, {schemaType}) => {
      if (schemaType === 'auditReport') {
        return [CopyPresentationUrlAction, ChangeStatusToPublishedAction, ...prev]
      }
      if (schemaType === 'post') {
        return [ChangeStatusToPublishedAction, ...prev]
      }
      return prev
    },
  },
})
