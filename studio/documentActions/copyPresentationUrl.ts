import type { DocumentActionProps, DocumentActionDescription } from 'sanity'
import { LinkSimple } from '@phosphor-icons/react'
import React from 'react'

const LinkIcon = () => React.createElement(LinkSimple, { size: 16, weight: 'duotone' })

export function CopyPresentationUrlAction(props: DocumentActionProps): DocumentActionDescription | null {
  if (!props.published) return null
  return {
    label: 'Copiar URL de presentación',
    icon: LinkIcon,
    onHandle: () => {
      const doc = props.draft || props.published
      const slug = doc?.slug as any
      if (slug?.current) {
        navigator.clipboard.writeText(`https://zutra.cl/consultoria/${slug.current}`)
      }
      props.onComplete()
    },
  }
}
