import type { DocumentBadgeComponent } from 'sanity'

export const StatusBadge: DocumentBadgeComponent = (props) => {
  const status = (props.draft || props.published)?.status as string
  const map = {
    draft:     { label: 'Borrador',  color: 'primary'  as const },
    published: { label: 'Publicado', color: 'success'  as const },
    archived:  { label: 'Archivado', color: 'danger'   as const },
  }
  return map[status as keyof typeof map] ?? null
}
