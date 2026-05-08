import React from 'react'
import { Card, Flex, Text, Box } from '@sanity/ui'

interface StatCardProps {
  title: string
  value: number | string
  icon: React.ElementType
  color: 'blue' | 'purple' | 'green' | 'yellow'
  onClick?: () => void
}

export function StatCard({ title, value, icon: Icon, color, onClick }: StatCardProps) {
  return (
    <Card 
      onClick={onClick}
      padding={4} 
      radius={2} 
      shadow={0} 
      style={{ 
        border: '1px solid var(--card-border-color)', 
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit',
        display: 'block'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--zutra-accent, #666)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--card-border-color)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <Flex align="center" gap={3}>
        <Box 
          padding={3} 
          style={{ 
            backgroundColor: 'var(--card-bg-color)', 
            border: '1px solid var(--card-border-color)',
            borderRadius: '6px',
            color: 'var(--zutra-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon size={24} weight="duotone" />
        </Box>
        <Box flex={1}>
          <Text muted size={1} weight="medium" style={{ fontFamily: 'var(--font-family-base)' }}>{title}</Text>
          <Box marginTop={2}>
            <Text size={4} weight="bold" style={{ fontFamily: 'var(--font-family-heading)' }}>{value}</Text>
          </Box>
        </Box>
      </Flex>
    </Card>
  )
}
