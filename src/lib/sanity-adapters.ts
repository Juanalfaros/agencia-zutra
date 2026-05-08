import { toHTML } from '@portabletext/to-html';
import type { Post, Author } from '@/types/blog-types';
import type { Service } from '@/types/service-types';
import type { ZutraCaseStudy } from '@/types/project-types';
import type { AuditReport } from '@/types/consultoria-types';

/**
 * Configuración para renderizar Portable Text a HTML compatible con el diseño existente
 */
const renderBlockType = (value: any): string => {
  const { _type, ...fields } = value;
  switch (_type) {
    case 'blockSplit': {
      const imgUrl =
        typeof fields.image === 'string'
          ? fields.image
          : fields.image?.asset?.url || '';
      return `
        <div class="split-block ${fields.imagePosition === 'right' ? 'split-block--reverse' : ''} reveal">
          <div class="split-image"><img src="${imgUrl}" alt="${fields.title || ''}" loading="lazy" /></div>
          <div class="split-content prose">${fields.content ? toHTML(fields.content, htmlConfig) : ''}</div>
        </div>`;
    }

    case 'findingBlock':
    case 'reportBlockFinding': {
      const icons: Record<string, string> = {
        critical: 'ph-warning-octagon',
        warning: 'ph-warning',
        opportunity: 'ph-rocket-launch',
        tip: 'ph-lightbulb',
      };
      const icon = icons[fields.type] || 'ph-info';
      return `
        <aside class="finding-card type-${fields.type || 'opportunity'} reveal">
          <span class="finding-icon-wrapper"><i class="ph ${icon} finding-icon"></i></span>
          <div class="finding-content">
            <h4 class="finding-title">${fields.title || ''}</h4>
            <div class="finding-body prose">${fields.description ? `<p>${fields.description}</p>` : fields.content ? toHTML(fields.content, htmlConfig) : ''}</div>
          </div>
        </aside>`;
    }

    case 'metricBlock':
    case 'reportBlockMetric': {
      const metricIcons: Record<string, string> = {
        good: 'ph-check-circle',
        warning: 'ph-warning',
        critical: 'ph-warning-octagon',
        opportunity: 'ph-rocket-launch',
      };
      const mIcon = metricIcons[fields.type || fields.status] || 'ph-info';
      return `
        <figure class="metric-highlight status-${fields.type || fields.status || 'neutral'} reveal">
          <div class="metric-bg-glow"></div>
          <i class="ph ${mIcon} metric-bg-icon"></i>
          <div class="metric-content">
            <div class="metric-val-wrapper"><strong class="metric-val">${fields.value || ''}</strong></div>
            <figcaption class="metric-text">
              <div class="metric-header"><i class="ph ${mIcon} status-icon"></i><h3 class="metric-label">${fields.label || ''}</h3></div>
              ${fields.sublabel ? `<p class="metric-sublabel">${fields.sublabel}</p>` : ''}
            </figcaption>
          </div>
        </figure>`;
    }

    case 'barChartBlock':
    case 'reportBlockBarChart': {
      const items = fields.items || [];
      // Improved numeric extraction: handle both dots and commas as thousands separators
      const numericVals = items.map((i: any) => {
        const valStr = String(i.value ?? '');
        const cleanStr = valStr.replace(/[^\d.,]/g, '');
        // If it has multiple separators or one followed by 3 digits, it's thousands
        if (
          (cleanStr.match(/[.,]/g) || []).length > 1 ||
          /[.,]\d{3}$/.test(cleanStr)
        ) {
          return parseFloat(cleanStr.replace(/[.,]/g, '')) || 0;
        }
        return parseFloat(cleanStr.replace(/,/g, '.')) || 0;
      });
      const maxVal = Math.max(...numericVals, 1);
      const bars = items
        .map((item: any, idx: number) => {
          const raw = numericVals[idx];
          const pct = Math.min(
            100,
            Math.max(0, Math.round((raw / maxVal) * 100))
          );
          const isHighlighted = !!item.highlight;
          const safePct = isNaN(pct) ? 0 : pct;
          return `
          <div class="barchart-row">
            <div class="barchart-label">${item.label || ''}</div>
            <div class="barchart-bar-area">
              <div class="barchart-fill${isHighlighted ? ' is-highlighted' : ''}" style="flex:${safePct}">
                <span class="barchart-value">${item.value ?? ''}</span>
              </div>
              <div class="barchart-spacer" style="flex:${100 - safePct}"></div>
            </div>
          </div>`;
        })
        .join('');
      return `
        <div class="barchart-wrapper reveal">
          ${fields.title ? `<h4 class="barchart-title">${fields.title}</h4>` : ''}
          <div class="barchart-container">${bars}</div>
        </div>`;
    }

    case 'vitalsTableBlock':
    case 'reportBlockVitalsTable': {
      const statusLabel: Record<string, string> = {
        good: 'Bien',
        'needs-improvement': 'Mejorar',
        poor: 'Crítico',
        critical: 'Crítico',
        warning: 'Advertencia',
      };
      const rows = (fields.rows || [])
        .map(
          (r: any) => `
        <tr>
          <td class="metric-name">${r.metric || ''}</td>
          <td><strong>${r.value || ''}</strong></td>
          <td>${r.threshold || ''}</td>
          <td><span class="vital-badge status-${r.status || 'neutral'}">${statusLabel[r.status] || r.status || ''}</span></td>
        </tr>`
        )
        .join('');
      return `
        <div class="vitals-table-wrapper reveal">
          <div class="vitals-header">
            <h4 class="vitals-title">${fields.title || 'Core Web Vitals'}</h4>
          </div>
          <div class="table-scroll">
            <table class="vitals-table">
              <thead><tr><th>Métrica</th><th>Valor</th><th>Umbral</th><th>Estado</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>`;
    }

    case 'stackTableBlock':
    case 'reportBlockStackTable': {
      const statusLabel: Record<string, string> = {
        good: 'OK',
        warning: 'Advertencia',
        critical: 'Crítico',
      };
      const rows = (fields.rows || [])
        .map(
          (r: any) => `
        <tr>
          <td class="component-col">${r.component || ''}</td>
          <td class="mono-text">${r.installed || ''}</td>
          <td class="mono-text">${r.current || ''}</td>
          <td>${r.gap || ''}</td>
          <td><span class="vital-badge status-${r.status || 'neutral'}">${statusLabel[r.status] || r.status || ''}</span></td>
        </tr>`
        )
        .join('');
      return `
        <div class="stack-table-wrapper reveal">
          ${fields.title ? `<div class="vitals-header"><h4 class="vitals-title">${fields.title}</h4></div>` : ''}
          <div class="table-scroll">
            <table class="stack-table">
              <thead><tr><th>Componente</th><th>Instalado</th><th>Actual</th><th>Beneficio</th><th>Estado</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>`;
    }

    case 'competitorTableBlock': {
      const highlight = fields.highlight || '';
      const rows = (fields.rows || [])
        .map((r: any) => {
          const isHighlighted =
            highlight && r.name && r.name.includes(highlight);
          const rankBadgeClass = r.rank <= 3 ? 'top-rank' : '';
          const highlightedRowClass = isHighlighted ? 'is-highlighted' : '';
          const highlightIcon = isHighlighted
            ? `<i class="ph ph-target highlight-icon" aria-label="Tu empresa"></i>`
            : '';
          const adsBadge = r.hasPaid
            ? `<span class="ads-badge active"><i class="ph ph-trend-up"></i> Sí</span>`
            : `<span class="ads-badge inactive">—</span>`;
          return `
          <tr class="comp-row ${highlightedRowClass}">
            <td class="col-rank"><span class="rank-badge ${rankBadgeClass}">#${r.rank || ''}</span></td>
            <th scope="row" class="col-company">
              <div class="company-info">
                <span class="company-name">${r.name || ''}${highlightIcon}</span>
                <a href="https://${r.domain || ''}" target="_blank" rel="noopener noreferrer" class="company-domain">
                  ${r.domain || ''} <i class="ph ph-arrow-up-right"></i>
                </a>
              </div>
            </th>
            <td class="col-diff"><p class="diff-text">${r.differentiator || ''}</p></td>
            <td class="col-ads">${adsBadge}</td>
          </tr>`;
        })
        .join('');
      return `
        <div class="competitor-table-wrapper reveal">
          ${fields.title ? `<div class="vitals-header"><h4 class="vitals-title">${fields.title}</h4></div>` : ''}
          <div class="table-scroll">
            <table class="competitor-table">
              <thead>
                <tr>
                  <th class="col-rank">Pos.</th>
                  <th class="col-company">Empresa</th>
                  <th class="col-diff">Diferenciador / Mensaje</th>
                  <th class="col-ads">Ads Activos</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>`;
    }

    case 'scoreGridBlock':
    case 'reportBlockScoreGrid': {
      const circumference = 163.36; // 2*π*26
      const titleLower = (fields.title || '').toLowerCase();
      const titleIcon =
        titleLower.includes('celular') ||
        titleLower.includes('móvil') ||
        titleLower.includes('movil')
          ? 'ph-device-mobile'
          : titleLower.includes('escritorio') || titleLower.includes('desktop')
            ? 'ph-desktop'
            : titleLower.includes('tablet')
              ? 'ph-device-tablet'
              : 'ph-chart-bar';
      const scores = (fields.scores || [])
        .map((s: any) => {
          const val =
            typeof s.value === 'number' ? s.value : parseInt(s.value) || 0;
          const color =
            val >= 90 ? '#10b981' : val >= 50 ? '#f59e0b' : '#ef4444';
          const dashoffset = (circumference * (1 - val / 100)).toFixed(1);
          return `
          <div class="metric-box">
            <div class="gauge-container">
              <svg class="gauge-svg" viewBox="0 0 60 60">
                <circle class="gauge-bg" cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="4"/>
                <circle class="gauge-progress" cx="30" cy="30" r="26" fill="none" stroke="${color}" stroke-width="4"
                  stroke-dasharray="${circumference}" stroke-dashoffset="${dashoffset}" stroke-linecap="round"/>
              </svg>
              <span class="gauge-value" style="color:${color}">${val}</span>
            </div>
            <div class="metric-label">${s.label || ''}</div>
          </div>`;
        })
        .join('');
      const header = fields.title
        ? `<div class="score-grid-header"><i class="ph-duotone ${titleIcon} header-icon"></i><h4 class="score-grid-title">${fields.title}</h4></div>`
        : '';
      return `
        <div class="score-grid-wrapper reveal">
          ${header}
          <div class="metrics-grid">${scores}</div>
        </div>`;
    }

    case 'priorityBlock':
    case 'reportBlockPriority': {
      const levelMap: Record<string, string> = {
        urgent: 'urgent',
        short: 'short',
        'short-term': 'short',
        medium: 'medium',
        'medium-term': 'medium',
      };
      const levelClass = levelMap[fields.level] || 'urgent';
      const levelLabels: Record<string, string> = {
        urgent: 'Urgente',
        short: 'Corto plazo',
        medium: 'Mediano plazo',
      };
      const levelLabel = levelLabels[levelClass] || fields.level || '';
      const items = (fields.items || [])
        .map(
          (item: string) => `
        <li><i class="ph ph-check check-icon priority-icon"></i>${item}</li>`
        )
        .join('');
      return `
        <div class="priority-block priority-${levelClass} reveal">
          <div class="priority-header">
            <i class="ph ph-clock-countdown priority-icon" style="font-size:1.25rem"></i>
            <h4 class="priority-title">${fields.title || levelLabel}</h4>
          </div>
          <ul class="priority-list">${items}</ul>
        </div>`;
    }

    case 'ctaBlock':
    case 'reportBlockCTA': {
      return `
        <div class="report-cta-footer reveal">
          <div class="report-cta-card">
            <div class="cta-icon"><i class="ph ph-rocket-launch"></i></div>
            <div style="flex:1">
              ${fields.title ? `<h3 class="cta-title">${fields.title}</h3>` : ''}
              ${fields.description ? `<p class="cta-desc">${fields.description}</p>` : ''}
            </div>
            ${fields.buttonText && fields.buttonLink ? `<a href="${fields.buttonLink}" class="cta-btn" target="_blank" rel="noopener">${fields.buttonText} <i class="ph ph-arrow-right"></i></a>` : ''}
          </div>
        </div>`;
    }

    case 'optionsGridBlock':
    case 'reportBlockOptionsGrid': {
      const options = (fields.options || [])
        .map((opt: any) => {
          const prosHtml =
            (opt.pros || []).length > 0
              ? `<div class="list-section"><strong class="list-title text-good">Pros</strong><ul class="option-list">${(opt.pros || []).map((p: string) => `<li><i class="ph ph-check text-good" aria-hidden="true"></i><span>${p}</span></li>`).join('')}</ul></div>`
              : '';
          const consHtml =
            (opt.cons || []).length > 0
              ? `<div class="list-section"><strong class="list-title text-poor">Contras</strong><ul class="option-list">${(opt.cons || []).map((c: string) => `<li><i class="ph ph-x text-poor" aria-hidden="true"></i><span>${c}</span></li>`).join('')}</ul></div>`
              : '';
          const desc = opt.description
            ? typeof opt.description === 'string'
              ? `<p>${opt.description}</p>`
              : toHTML(opt.description, htmlConfig)
            : '';
          const iconHtml = opt.icon
            ? `<span class="option-icon-box" aria-hidden="true"><i class="ph-duotone ${opt.icon}"></i></span>`
            : '';
          const footerHtml =
            opt.price || opt.ctaText
              ? `<footer class="option-footer">${opt.price ? `<strong class="option-price">${opt.price}</strong>` : ''}${opt.ctaText ? `<span class="option-cta-text">${opt.ctaText}</span>` : ''}</footer>`
              : '';
          return `
          <div class="option-card${opt.recommended ? ' is-recommended' : ''}">
            ${opt.recommended ? '<span class="option-recommended-badge">Recomendado</span>' : ''}
            ${opt.variant ? `<p class="option-variant">${opt.variant}</p>` : ''}
            <header class="option-header">${iconHtml}<h4 class="option-title">${opt.title || ''}</h4></header>
            ${desc ? `<div class="option-description">${desc}</div>` : ''}
            ${prosHtml || consHtml ? `<div class="option-lists">${prosHtml}${consHtml}</div>` : ''}
            ${footerHtml}
          </div>`;
        })
        .join('');
      return `
        <div class="reveal" style="margin:2rem 0">
          ${fields.title ? `<h3 class="options-section-title">${fields.title}</h3>` : ''}
          <div class="options-grid">${options}</div>
        </div>`;
    }

    default:
      return `<!-- Unsupported block: ${_type} -->`;
  }
};

const htmlConfig: any = {
  onMissingHandler: (message: string, _options: any) => {
    console.warn('Missing handler for portable text node:', message);
  },
  components: {
    types: {
      // Handle all inline Sanity block types (injected via embedded-entry-block in migration)
      findingBlock: ({ value }: any) => renderBlockType(value),
      metricBlock: ({ value }: any) => renderBlockType(value),
      barChartBlock: ({ value }: any) => renderBlockType(value),
      vitalsTableBlock: ({ value }: any) => renderBlockType(value),
      stackTableBlock: ({ value }: any) => renderBlockType(value),
      scoreGridBlock: ({ value }: any) => renderBlockType(value),
      priorityBlock: ({ value }: any) => renderBlockType(value),
      ctaBlock: ({ value }: any) => renderBlockType(value),
      optionsGridBlock: ({ value }: any) => renderBlockType(value),
      competitorTableBlock: ({ value }: any) => renderBlockType(value),
      blockSplit: ({ value }: any) => renderBlockType(value),
      // Legacy Contentful type IDs (in case any entry still uses them)
      reportBlockFinding: ({ value }: any) => renderBlockType(value),
      reportBlockMetric: ({ value }: any) => renderBlockType(value),
      reportBlockBarChart: ({ value }: any) => renderBlockType(value),
      reportBlockVitalsTable: ({ value }: any) => renderBlockType(value),
      reportBlockStackTable: ({ value }: any) => renderBlockType(value),
      reportBlockScoreGrid: ({ value }: any) => renderBlockType(value),
      reportBlockPriority: ({ value }: any) => renderBlockType(value),
      reportBlockCTA: ({ value }: any) => renderBlockType(value),
      reportBlockOptionsGrid: ({ value }: any) => renderBlockType(value),
      'embedded-entry-block': ({ value }: any) => renderBlockType(value),
      table: (_: any) =>
        `<div class="table-container"><table>[Tabla]</table></div>`,
      reference: ({ value }: any) =>
        `<!-- Reference to ${value._ref || 'unknown'} -->`,
      image: ({ value }: any) => {
        const url =
          typeof value.asset === 'string'
            ? value.asset
            : value.asset?.url || value.url || '';
        return url
          ? `<figure class="report-image"><img src="${url}" alt="" loading="lazy" /></figure>`
          : '';
      },
    },
  },
};

export function renderPortableText(content: any): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  return toHTML(content, htmlConfig);
}

export function adaptAuthor(sanityDoc: any): Author {
  return {
    id: sanityDoc._id,
    name: sanityDoc.name || '',
    role: sanityDoc.role || '',
    avatar: sanityDoc.avatar || '',
    bio: sanityDoc.bio || '',
    social: {
      linkedin: sanityDoc.linkedin,
      instagram: sanityDoc.instagram,
    },
  };
}

export function adaptBlogPost(doc: any): Post {
  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    excerpt: renderPortableText(doc.excerpt),
    content: renderPortableText(doc.content),
    publishDate: doc.date || doc._createdAt,
    image: doc.featuredImage,
    author: doc.author ? adaptAuthor(doc.author) : ({} as Author),
    category: doc.category || 'general',
    tags: doc.tags || [],
    readingTime: (() => {
      const text =
        typeof doc.content === 'string'
          ? doc.content
          : JSON.stringify(doc.content || '');
      const words = text.split(/\s+/).filter(Boolean).length;
      const minutes = Math.max(1, Math.round(words / 200));
      return `${minutes} min`;
    })(),
    featured: !!doc.featured,
    internal: { entryId: doc._id },
  };
}

export function adaptService(doc: any): Service {
  // Resolve category slug from categoryRef object (stored raw from Contentful migration)
  let categorySlug = doc.category || 'general';
  if (
    doc.categoryRef &&
    typeof doc.categoryRef === 'object' &&
    doc.categoryRef.fields?.slug
  ) {
    categorySlug = doc.categoryRef.fields.slug;
  }

  // Derive badge: explicit badge field, or featured → "Destacado", or first tag
  let badge: string | undefined = doc.badge;
  if (!badge) {
    if (doc.featured) badge = 'Destacado';
    else if (Array.isArray(doc.tags) && doc.tags.length > 0)
      badge = doc.tags[0];
  }

  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    badge,
    category: categorySlug,
    tags: doc.tags || [],
    description: doc.excerpt || renderPortableText(doc.description),
    longDescription: renderPortableText(doc.longDescription || doc.description),
    details: doc.details?.length
      ? doc.details
      : (doc.deliverables || []).map((d: any) =>
          typeof d === 'string' ? { title: d, description: '' } : d
        ),
    features: doc.features || [],
    benefits: doc.benefits || doc.deliverables || [],
    deliverables: doc.deliverables || [],
    result: doc.result,
    icon: doc.icon,
    featured: !!doc.featured,
    priceAmount: doc.priceAmount ?? doc.price ?? undefined,
    priceMeta: doc.priceMeta ?? doc.duration ?? undefined,
    featuredImage: doc.featuredImage
      ? {
          src: doc.featuredImage,
          width: 1200,
          height: 800,
          alt: doc.title,
        }
      : null,
    order: doc.order || 99,
  } as any;
}

export function adaptCaseStudy(doc: any): ZutraCaseStudy {
  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    subtitle: doc.subtitle || '',
    tagline: doc.tagline || '',
    description:
      typeof doc.description === 'string'
        ? doc.description
        : renderPortableText(doc.description),
    industry: doc.industry || '',
    year:
      doc.year || (doc.date ? new Date(doc.date).getFullYear().toString() : ''),
    client: doc.client || '',
    featuredImage: {
      src: {
        src: doc.featuredImage || '',
        width: 1200,
        height: 800,
        alt: doc.title,
      },
      alt: doc.title,
    },
    projectType: doc.projectType || '',
    role: doc.role || '',
    context: doc.context || '',
    websiteUrl: doc.websiteUrl || '',
    challenge: renderPortableText(doc.challenge),
    solution: renderPortableText(doc.solution),
    challenges: doc.challenges || [],
    techStack: doc.techStack || [],
    process: doc.process || [],
    keyFeatures: doc.keyFeatures || [],
    services: doc.services || [],
    featured: !!doc.featured,
    gallery: (doc.gallery || []).map((img: any) => {
      const url = typeof img === 'string' ? img : img?.src || '';
      const alt = typeof img === 'object' && img?.alt ? img.alt : doc.title;
      return {
        src: { src: url, width: 1200, height: 800, alt },
        alt,
        category: 'detail',
      };
    }),
    tags: doc.tags || [],
    order: doc.order ?? 99,
  } as any;
}

/**
 * Robustly ensures a value is a string, handling edge cases like
 * character objects {0: 'a', 1: 'b'} often seen in broken migrations.
 */
function ensureString(val: any): string {
  if (typeof val === 'string') return val;
  if (!val) return '';

  if (typeof val === 'object') {
    // Caso 1: Objeto de caracteres (índices numéricos)
    const keys = Object.keys(val);
    if (keys.length > 0 && keys.every((k) => /^\d+$/.test(k))) {
      return keys
        .sort((a, b) => Number(a) - Number(b))
        .map((k) => val[k])
        .join('');
    }

    // Caso 2: Bloques de Sanity / Portable Text
    if (val.children && Array.isArray(val.children)) {
      return val.children.map((c: any) => c.text || '').join('');
    }

    // Caso 3: Propiedades comunes de texto
    if (val.text) return String(val.text);
    if (val.value) return String(val.value);
    if (val.title) return String(val.title);
    if (val.description) return String(val.description);

    // Caso 4: JSON stringify para ver el contenido real en pantalla (debug)
    try {
      return JSON.stringify(val);
    } catch (e) {
      return String(val);
    }
  }

  return String(val);
}

export function adaptAuditReport(doc: any): AuditReport {
  if (!doc) return {} as any;

  // Robust string extraction for category and analyst (handles objects if unexpanded)
  const category =
    typeof doc.category === 'string'
      ? doc.category
      : doc.category?.slug?.current || doc.category?.title || 'general';

  const analyst =
    typeof doc.analyst === 'string'
      ? doc.analyst
      : doc.analystRef?.name || doc.analyst || 'Analista Zutra';

  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title || 'Reporte sin título',
    client: doc.client || '',
    description: doc.description || '',
    analyst: analyst,
    date: doc.date || doc._createdAt,
    category: category,
    protected: !!doc.protected,
    accessExpiry: doc.accessExpiry,
    presentationEnabled: !!doc.presentationEnabled,
    headerImage: doc.headerImage,
    analystRef: doc.analystRef
      ? {
          name: doc.analystRef.name || analyst,
          role: doc.analystRef.role || '',
          avatar: doc.analystRef.avatar,
        }
      : undefined,
    executiveSummary: renderPortableText(doc.executiveSummary),
    conclusion: renderPortableText(doc.conclusion),
    reportContent: Array.isArray(doc.reportContent)
      ? doc.reportContent.map((b: any) => {
          if (b._type === 'priorityBlock' && Array.isArray(b.items)) {
            return { ...b, items: b.items.map(ensureString) };
          }
          if (b._type === 'optionsGridBlock' && Array.isArray(b.options)) {
            return {
              ...b,
              options: (b.options || []).map((opt: any) => ({
                ...opt,
                pros: Array.isArray(opt.pros) ? opt.pros.map(ensureString) : [],
                cons: Array.isArray(opt.cons) ? opt.cons.map(ensureString) : [],
              })),
            };
          }
          return b;
        })
      : [],
    slides: (doc.slides || []).filter(Boolean).map((s: any) => ({
      id: s._id || Math.random().toString(36),
      title: s.title || 'Diapositiva',
      content: renderPortableText(s.content),
      image: s.image,
      type: s.type || 'info',
      priority: s.priority,
      highlight: ensureString(s.highlight),
      bullets: Array.isArray(s.bullets) ? s.bullets.map(ensureString) : [],
      ctaText: ensureString(s.ctaText),
      ctaLink: ensureString(s.ctaLink),
      order: s.order || 99,
      options: (s.options || []).filter(Boolean).map((o: any) => ({
        id: o._id || Math.random().toString(36),
        variant: o.variant || '',
        title: o.title || '',
        description: renderPortableText(o.description),
        recommended: !!o.recommended,
        pros: Array.isArray(o.pros) ? o.pros : [],
        cons: Array.isArray(o.cons) ? o.cons : [],
        price: o.price || '',
        ctaText: o.ctaText || '',
        ctaLink: o.ctaLink || '',
      })),
    })),
  } as any;
}

export function adaptTestimonial(doc: any): any {
  return {
    id: doc._id,
    author: doc.author || '',
    role: doc.role || '',
    company: doc.company || '',
    quote: renderPortableText(doc.quote),
    avatar: doc.avatar ? { src: doc.avatar } : null,
    featured: !!doc.featured,
    order: doc.order || 99,
  };
}

export function adaptCategory(doc: any): any {
  return {
    id: doc.slug,
    label: doc.title || '',
    order: doc.order || 99,
  };
}

export function adaptRecurso(doc: any): any {
  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    description:
      typeof doc.description === 'string'
        ? doc.description
        : renderPortableText(doc.description),
    longDescription: renderPortableText(doc.longDescription),
    featuredImage: doc.featuredImage
      ? {
          src: doc.featuredImage,
          alt: doc.title,
        }
      : null,
    gallery: (doc.gallery || []).map((img: any) => ({
      src: img.src,
      alt: img.alt || doc.title,
    })),
    isFree: !!doc.isFree,
    price: doc.price || '',
    gumroadUrl: doc.gumroadUrl || '',
    status: doc.status || 'published',
    category: doc.category || '',
    features: doc.features || [],
    techStack: doc.techStack || [],
    tags: doc.tags || [],
    demoUrl: doc.demoUrl || '',
  };
}

export function adaptHeroSlide(doc: any): any {
  return {
    id: doc._id,
    title: doc.title || '',
    subtitle: renderPortableText(doc.subtitle),
    image: doc.image || '',
    imageAlt: doc.imageAlt || doc.title || '',
    buttonText: doc.buttonText || 'Ver más',
    buttonLink: doc.buttonLink || '#',
    active: !!doc.active,
    order: doc.order || 99,
  };
}
