import { useDocumentOperation } from 'sanity'
import type { DocumentActionProps, DocumentActionDescription } from 'sanity'
import { CheckCircle } from '@phosphor-icons/react'
import React from 'react'

const PublishIcon = () => React.createElement(CheckCircle, { size: 16, weight: 'duotone' })

export function ChangeStatusToPublishedAction(props: DocumentActionProps): DocumentActionDescription | null {
  const { patch } = useDocumentOperation(props.id, props.type)
  const doc = props.draft || props.published
  if (!doc || doc.status === 'published') return null
  return {
    label: 'Publicar ' + (props.type === 'auditReport' ? 'reporte' : 'artículo'),
    icon: PublishIcon,
    tone: 'positive',
    onHandle: () => {
      patch.execute([{ set: { status: 'published' } }])
      props.onComplete()
    },
  }
}
