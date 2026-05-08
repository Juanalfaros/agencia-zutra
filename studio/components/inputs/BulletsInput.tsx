import React, {useCallback} from 'react'
import {ArrayOfPrimitivesInputProps, set, unset, ArraySchemaType} from 'sanity'
import {Stack, TextInput, Flex, Button, Box, Text} from '@sanity/ui'
import {AddIcon, TrashIcon} from '@sanity/icons'

/**
 * Recupera un string desde posibles formatos corruptos:
 * - String normal: "texto"
 * - Objeto de caracteres: {"0":"t","1":"e","2":"x","3":"t","4":"o"}
 * - Otros objetos: convierte a string
 */
function extractString(val: unknown): string {
  if (typeof val === 'string') return val
  if (!val) return ''

  if (typeof val === 'object') {
    const keys = Object.keys(val as object)
    // Detecta objeto de caracteres (keys numéricas consecutivas)
    if (keys.length > 0 && keys.every((k) => /^\d+$/.test(k))) {
      return keys
        .sort((a, b) => Number(a) - Number(b))
        .map((k) => (val as Record<string, string>)[k])
        .join('')
    }
    // Fallback: extraer propiedades conocidas o convertir a string
    if ('text' in (val as object)) return String((val as {text: unknown}).text)
    if ('value' in (val as object)) return String((val as {value: unknown}).value)
    try {
      return JSON.stringify(val)
    } catch {
      return String(val)
    }
  }

  return String(val)
}

/**
 * Input personalizado para campos bullets que maneja datos corruptos
 * (objetos de caracteres) y los convierte a strings limpios.
 */
export function BulletsInput(
  props: ArrayOfPrimitivesInputProps<string | number | boolean, ArraySchemaType<unknown>>,
) {
  const {value, onChange, readOnly} = props

  // Normaliza el valor al montar: convierte objetos de caracteres a strings
  const normalizedValue = React.useMemo((): string[] => {
    if (!Array.isArray(value)) return []
    return value.map((item) => extractString(item))
  }, [value])

  // Sincroniza valor normalizado con Sanity si hay diferencias
  React.useEffect(() => {
    if (!Array.isArray(value)) return
    const needsUpdate = value.some((item, idx) => extractString(item) !== normalizedValue[idx])
    if (needsUpdate) {
      onChange(set(normalizedValue))
    }
  }, [value, normalizedValue, onChange])

  const handleAdd = useCallback(() => {
    const newValue = [...normalizedValue, '']
    onChange(set(newValue))
  }, [normalizedValue, onChange])

  const handleRemove = useCallback(
    (index: number) => {
      const newValue = normalizedValue.filter((_, i) => i !== index)
      onChange(newValue.length === 0 ? unset() : set(newValue))
    },
    [normalizedValue, onChange],
  )

  const handleChange = useCallback(
    (index: number, newText: string) => {
      const newValue = normalizedValue.map((item, i) => (i === index ? newText : item))
      onChange(set(newValue))
    },
    [normalizedValue, onChange],
  )

  return (
    <Stack space={3}>
      {normalizedValue.length === 0 && (
        <Box paddingY={2}>
          <Text muted size={1}>
            No hay puntos clave. Agrega uno para comenzar.
          </Text>
        </Box>
      )}

      {normalizedValue.map((bullet, index) => (
        <Flex key={index} gap={2} align="center">
          <Box flex={1}>
            <TextInput
              value={bullet}
              onChange={(event) => handleChange(index, event.currentTarget.value)}
              placeholder="Escribe un punto clave..."
              disabled={readOnly}
            />
          </Box>
          <Button
            icon={TrashIcon}
            tone="critical"
            mode="bleed"
            onClick={() => handleRemove(index)}
            disabled={readOnly}
            aria-label="Eliminar punto"
          />
        </Flex>
      ))}

      <Button
        icon={AddIcon}
        mode="ghost"
        onClick={handleAdd}
        disabled={readOnly}
        text="Agregar punto clave"
      />
    </Stack>
  )
}
