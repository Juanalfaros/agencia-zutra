import { authorType } from './author'
import { testimonialType } from './testimonial'
import { categoryType } from './category'
import { postType } from './post'
import { serviceType } from './service'
import { caseStudyType } from './caseStudy'
import { resourceType } from './resource'
import { heroSlideType } from './heroSlide'

import {
  findingBlockType,
  metricBlockType,
  ctaBlockType,
  barChartBlockType,
  vitalsTableBlockType,
  scoreGridBlockType,
  stackTableBlockType,
  priorityBlockType,
  optionsGridBlockType,
  competitorTableBlockType,
  reportContentBlockType
} from './reportBlocks'

import {
  slideOptionType,
  consultoriaSlideType,
  auditReportType
} from './consultoria'
import { invoiceType } from './invoice'
import { planType } from './plan'

export const schemaTypes = [
  // Core
  authorType,
  postType,
  serviceType,
  caseStudyType,
  resourceType,
  heroSlideType,
  testimonialType,
  categoryType,

  // Blocks
  findingBlockType,
  metricBlockType,
  ctaBlockType,
  barChartBlockType,
  vitalsTableBlockType,
  scoreGridBlockType,
  stackTableBlockType,
  priorityBlockType,
  optionsGridBlockType,
  competitorTableBlockType,
  reportContentBlockType,

  // Consultoria
  slideOptionType,
  consultoriaSlideType,
  auditReportType,

  // Administración
  invoiceType,

  // Planes de precios
  planType,
]
