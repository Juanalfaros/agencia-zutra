import React, { useEffect, useState } from 'react'
import { Stack, Heading, Card, Text, Flex, Badge, Box, Spinner } from '@sanity/ui'
import { useClient } from 'sanity'
import { useRouter } from 'sanity/router'
import { ClockClockwise } from '@phosphor-icons/react'

interface DocumentItem {
  _id: string
  _type: string
  _updatedAt: string
  title?: string
  name?: string
  status: 'published' | 'draft'
}

export function RecentActivity() {
  const client = useClient({ apiVersion: '2024-04-28' })
  const { navigateIntent } = useRouter() as any
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        // Fetch last 5 updated documents that aren't Sanity internal documents
        const query = `
          *[!(_id in path("_.**")) && !(_type match "system.**")] | order(_updatedAt desc)[0...5] {
            _id,
            _type,
            _updatedAt,
            title,
            name
          }
        `
        const result = await client.fetch(query)
        
        // Process results to identify drafts
        const processedDocs = result.map((doc: any) => {
          const isDraft = doc._id.startsWith('drafts.')
          const baseId = isDraft ? doc._id.replace('drafts.', '') : doc._id
          
          return {
            _id: baseId, // Always use base ID for intents
            _type: doc._type,
            _updatedAt: doc._updatedAt,
            title: doc.title || doc.name || 'Documento sin título',
            status: isDraft ? 'draft' : 'published'
          }
        })
        
        // deduplicate
        const uniqueDocs = Array.from(new Map(processedDocs.map((item: any) => [item._id, item])).values()) as DocumentItem[]
        
        setDocuments(uniqueDocs.slice(0, 5))
      } catch (error) {
        console.error("Error fetching recent documents:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecent()
  }, [client])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.RelativeTimeFormat('es', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    )
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      auditReport: 'Reporte',
      post: 'Artículo',
      service: 'Servicio',
      caseStudy: 'Caso',
      resource: 'Recurso',
      consultoriaSlide: 'Diapositiva',
      slideOption: 'Opción',
      heroSlide: 'Hero',
      testimonial: 'Testimonio'
    }
    return labels[type] || type
  }

  return (
    <Stack space={4}>
      <Flex align="center" gap={2}>
        <ClockClockwise size={20} weight="duotone" style={{ color: 'var(--zutra-accent)' }} />
        <Heading as="h3" size={1}>Actividad Reciente</Heading>
      </Flex>
      
      {loading ? (
        <Flex align="center" justify="center" padding={4}>
          <Spinner muted />
        </Flex>
      ) : documents.length === 0 ? (
        <Text muted size={1}>No hay actividad reciente.</Text>
      ) : (
        <Stack space={2}>
          {documents.map((doc) => (
            <Card
              key={doc._id}
              padding={3}
              radius={2}
              shadow={0}
              onClick={() => navigateIntent('edit', { id: doc._id, type: doc._type })}
              style={{
                border: '1px solid var(--card-border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--zutra-accent, #666)'
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--card-border-color)'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              <Flex align="center" justify="space-between">
                <Stack space={2} flex={1}>
                  <Text size={1} weight="medium" style={{ fontFamily: 'var(--font-family-base)' }}>
                    {doc.title}
                  </Text>
                  <Flex align="center" gap={2}>
                    <Badge tone="default" fontSize={0}>{getTypeLabel(doc._type)}</Badge>
                    <Text size={0} muted>{formatDate(doc._updatedAt)}</Text>
                  </Flex>
                </Stack>
                <Box marginLeft={3}>
                  <Badge 
                    tone={doc.status === 'draft' ? 'caution' : 'positive'} 
                    fontSize={0}
                  >
                    {doc.status === 'draft' ? 'Borrador' : 'Publicado'}
                  </Badge>
                </Box>
              </Flex>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
