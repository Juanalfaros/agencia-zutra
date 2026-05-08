import React, { useCallback, forwardRef } from 'react'
import { StringInputProps, set, unset } from 'sanity'
import { Card, Flex, Text, Stack } from '@sanity/ui'

export const VariantPicker = forwardRef<HTMLDivElement, StringInputProps>((props, ref) => {
  const { value, onChange, schemaType } = props
  const list = schemaType.options?.list as { title: string, value: string }[] || []

  const handleClick = useCallback(
    (selectedValue: string) => {
      onChange(selectedValue ? set(selectedValue) : unset())
    },
    [onChange]
  )

  return (
    <Stack space={3} ref={ref}>
      <Flex gap={3} wrap="wrap">
        {list.map((option) => {
          const isSelected = value === option.value
          return (
            <Card
              key={option.value}
              padding={4}
              radius={2}
              style={{
                cursor: 'pointer',
                border: isSelected 
                  ? '2px solid var(--zutra-accent, #7C5CFC)' 
                  : '1px solid var(--card-border-color)',
                backgroundColor: isSelected ? 'var(--card-bg-color)' : 'transparent',
                flex: 1,
                minWidth: '150px',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                opacity: isSelected ? 1 : 0.6,
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
              }}
              onClick={() => handleClick(option.value)}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.borderColor = 'var(--zutra-accent, #7C5CFC)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.opacity = '0.6'
                  e.currentTarget.style.borderColor = 'var(--card-border-color)'
                }
              }}
            >
              <Text 
                weight={isSelected ? "bold" : "regular"} 
                size={2}
                style={{ 
                  fontFamily: 'var(--font-family-heading)',
                  color: isSelected ? 'var(--zutra-accent, inherit)' : 'inherit'
                }}
              >
                {option.title}
              </Text>
            </Card>
          )
        })}
      </Flex>
    </Stack>
  )
})
