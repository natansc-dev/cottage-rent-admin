import * as Tooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'
// import { AlertDialogComponent } from '../AlertDialog'
import { IconButton, TooltipArrow, TooltipContent } from './styles'

interface TooltipProps {
  children: ReactNode
  label: 'Editar' | 'Deletar'
  color: 'yellow' | 'red'
}

export function TooltipComponent({ children, label, color }: TooltipProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {label === 'Deletar' ? (
            // <AlertDialogComponent>
            <IconButton color={color}>{children}</IconButton>
          ) : (
            // </AlertDialogComponent>
            <IconButton color={color}>{children}</IconButton>
          )}
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
