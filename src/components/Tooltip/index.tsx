import * as Tooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'
import AlertDialogDemo from '../AlertDialog'
import { IconButton, TooltipArrow, TooltipContent } from './styles'

interface TooltipProps {
  children: ReactNode
  label: 'criar' | 'editar' | 'deletar'
}

export function TooltipComponent({ children, label }: TooltipProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <IconButton color={label}>{children}</IconButton>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <TooltipContent sideOffset={5}>
            {label}
            <TooltipArrow />
          </TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
