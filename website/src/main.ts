import App from './App.vue'
import { ViteSSG } from 'vite-ssg'
import ChakraUIVuePlugin, { chakra, extendTheme } from '@chakra-ui/vue-next'
import { domElements } from '@chakra-ui/vue-system'
import {
  feGithub,
  feStar,
  feBook,
  feMenu,
  feMessageCircle,
  feSearch,
  fePackage,
} from 'feather-icons-paths'
import { hydrate } from '@emotion/css'
import routes from 'pages-generated'

import './styles/main.css'
import { mode } from '@chakra-ui/vue-theme-tools'

export const createApp = ViteSSG(App, { routes }, ({ app, isClient }) => {
  if (isClient) {
    // @ts-expect-error Need to add $emotionSSRIds to global namespace
    const ssrIds = window?.$emotionSSRIds || []
    hydrate(ssrIds)
  }

  app.use(ChakraUIVuePlugin, {
    extendTheme: extendTheme({
      colors: {
        green: {
          '50': '#EDF8F2',
          '100': '#CCEBDC',
          '200': '#ABDEC5',
          '300': '#8AD0AE',
          '400': '#6AC397',
          '500': '#49B681',
          '600': '#3A9267',
          '700': '#2C6D4D',
          '800': '#1D4933',
          '900': '#0F241A',
        },
      },
      fonts: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif',
      },
      shadows: {
        search:
          '0 0 0 1px rgba(16,22,26,.1), 0 4px 8px rgba(16,22,26,.2), 0 18px 46px 6px rgba(16,22,26,.2)',
      },
      styles: {
        global: (props: any) => ({
          body: {
            color: mode('gray.700', 'whiteAlpha.900')(props),
            '.deleted': {
              color: '#ff8383 !important',
              fontStyle: 'normal !important',
            },
            '.inserted': {
              color: '#b5f4a5 !important',
              fontStyle: 'normal !important',
            },
          },
        }),
      },
      textStyles: {
        heading: {
          fontFamily: 'heading',
          textAlign: 'center',
          fontWeight: 'bold',
          letterSpacing: '-0.015em',
          lineHeight: '1.24',
          fontSize: { base: '2rem', md: '3.5rem' },
        },
        'heading-2': {
          fontFamily: 'heading',
          textAlign: 'center',
          fontWeight: 'bold',
          letterSpacing: '-0.015em',
          lineHeight: '1.24',
          fontSize: { base: '1.75rem', md: '2.75rem' },
        },
        caps: {
          textTransform: 'uppercase',
          fontSize: 'sm',
          letterSpacing: 'widest',
          fontWeight: 'bold',
        },
      },
      mdx: {
        h1: {
          mt: '2rem',
          mb: '.25rem',
          lineHeight: 1.2,
          fontWeight: 'bold',
          fontSize: '1.875rem',
          letterSpacing: '-.025em',
        },
        h2: {
          mt: '4rem',
          mb: '0.5rem',
          lineHeight: 1.3,
          fontWeight: 'semibold',
          fontSize: '1.5rem',
          letterSpacing: '-.025em',
          '& + h3': {
            mt: '1.5rem',
          },
        },
        h3: {
          mt: '3rem',
          // mb: "0.5rem",
          lineHeight: 1.25,
          fontWeight: 'semibold',
          fontSize: '1.25rem',
          letterSpacing: '-.025em',
        },
        h4: {
          mt: '3rem',
          lineHeight: 1.375,
          fontWeight: 'semibold',
          fontSize: '1.125rem',
        },
        a: {
          color: 'teal.500',
          fontWeight: 'semibold',
          transition: 'color 0.15s',
          transitionTimingFunction: 'ease-out',
          _hover: {
            color: 'teal.600',
          },
        },
        p: {
          mt: '1.25rem',
          lineHeight: 1.7,
          'blockquote &': {
            mt: 0,
          },
        },
        hr: {
          my: '4rem',
        },
        blockquote: {
          bg: 'orange.100',
          borderWidth: '1px',
          borderColor: 'orange.200',
          rounded: 'lg',
          px: '1.25rem',
          py: '1rem',
          my: '1.5rem',
        },
        ul: {
          mt: '1.5rem',
          ml: '1.25rem',
          'blockquote &': { mt: 0 },
          '& > * + *': {
            mt: '0.25rem',
          },
        },
        code: {
          rounded: 'sm',
          px: '1',
          fontSize: '0.875em',
          py: '2px',
          whiteSpace: 'nowrap',
          lineHeight: 'normal',
        },
      },
    }),
    icons: {
      library: {
        feGithub,
        feStar,
        feBook,
        feMenu,
        feMessageCircle,
        feSearch,
        fePackage,
      },
    },
  })

  domElements.forEach((tag) => {
    app.component(`chakra.${tag}`, chakra(tag))
  })
})
