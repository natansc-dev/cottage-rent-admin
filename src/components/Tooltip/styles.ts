import { styled, keyframes } from '@stitches/react'
import { blackA, red, yellow } from '@radix-ui/colors'

import * as Tooltip from '@radix-ui/react-tooltip'

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

export const TooltipContent = styled(Tooltip.Content, {
  borderRadius: 4,
  padding: '10px 15px',
  fontSize: 15,
  lineHeight: 1,
  color: blackA.blackA12,
  backgroundColor: 'white',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  userSelect: 'none',
  animationDuration: '200ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="delayed-open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
})

export const TooltipArrow = styled(Tooltip.Arrow, {
  fill: 'white',
})

export const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: 6,
  height: 35,
  width: 35,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: `${blackA.blackA12}`,
  backgroundColor: 'white',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,

  variants: {
    color: {
      red: {
        background: `${red.red8}`,
        '&:hover': {
          background: `${red.red7}`,
          color: `${blackA.blackA10}`,
        },
      },
      yellow: {
        background: `${yellow.yellow8}`,
        '&:hover': {
          background: `${yellow.yellow7}`,
          color: `${blackA.blackA10}`,
        },
      },
    },
  },
  defaultVariants: {
    color: 'yellow',
  },
})
