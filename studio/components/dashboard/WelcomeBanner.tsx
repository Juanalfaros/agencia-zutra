import React from 'react'
import { Card, Heading, Text, Stack, Box, Flex } from '@sanity/ui'
import { ChartBar, Globe, Trophy, RocketLaunch } from '@phosphor-icons/react'

export function WelcomeBanner() {
  return (
    <Card
      padding={[4, 4, 5]}
      radius={3}
      shadow={1}
      style={{
        border: '1px solid var(--card-border-color)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, var(--zutra-accent) 0%, transparent 70%)',
          opacity: 0.1,
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
      <Flex direction={['column', 'column', 'row']} align="center" gap={[4, 4, 5]}>
        
        <Stack space={3} flex={1} style={{ textAlign: 'left', width: '100%' }}>
          <Heading as="h1" size={4} style={{ fontFamily: 'var(--font-family-heading)', color: 'var(--text-color)' }}>
            Bienvenido al Studio Zutra
          </Heading>
          <Text muted size={2} style={{ maxWidth: '600px', lineHeight: 1.5 }}>
            Tu centro de comando para gestionar reportes de consultoría interactivos, actualizar el portafolio de la agencia y administrar todo el contenido del ecosistema Zutra.
          </Text>
        </Stack>

        <Box 
          style={{ 
            position: 'relative', 
            width: '180px', 
            height: '140px', 
            flexShrink: 0,
            opacity: 0.9
          }}
        >
          <Box style={{ position: 'absolute', top: 0, left: '50px', color: 'var(--zutra-accent)', transform: 'rotate(10deg)' }}>
            <Globe size={64} weight="duotone" />
          </Box>
          <Box style={{ position: 'absolute', bottom: '10px', left: 0, color: 'var(--card-icon-color)', opacity: 0.7, transform: 'rotate(-15deg)' }}>
            <ChartBar size={52} weight="duotone" />
          </Box>
          <Box style={{ position: 'absolute', top: '20px', right: 0, color: 'var(--card-icon-color)', opacity: 0.6, transform: 'rotate(20deg)' }}>
            <Trophy size={48} weight="duotone" />
          </Box>
          <Box style={{ position: 'absolute', bottom: 0, right: '30px', color: 'var(--zutra-accent)', opacity: 0.9, transform: 'rotate(-5deg)' }}>
            <RocketLaunch size={56} weight="duotone" />
          </Box>
        </Box>

      </Flex>
    </Card>
  )
}
