import { keyframes } from '@chakra-ui/vue-system'
import { getColor, mode } from '@chakra-ui/vue-theme-tools'

const fade = (startColor: string, endColor: string) =>
  keyframes({
    from: { borderColor: startColor, background: startColor },
    to: { borderColor: endColor, background: endColor },
  })

const baseStyle = (props: Record<string, any>) => {
  const defaultStartColor = mode('gray.100', 'gray.800')(props)
  const defaultEndColor = mode('gray.400', 'gray.600')(props)

  const {
    startColor = defaultStartColor,
    endColor = defaultEndColor,
    speed,
    theme,
  } = props

  const start = getColor(theme, startColor)
  const end = getColor(theme, endColor)

  return {
    opacity: 0.7,
    borderRadius: '2px',
    borderColor: start,
    background: end,
    animation: `${speed}s linear infinite alternate ${fade(start, end)}`,
  }
}

export default {
  baseStyle,
}
