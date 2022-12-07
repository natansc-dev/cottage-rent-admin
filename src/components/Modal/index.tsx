import React, { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  Fieldset,
  Flex,
  IconButton,
  Input,
  Label,
} from './styles'

interface ModalProps {
  children: ReactNode
}

export function Modal({ children }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />

        <DialogContent>
          <DialogTitle>Edit profile</DialogTitle>

          <DialogDescription>
            Make changes to your profile here. Click save when yore done.
          </DialogDescription>

          <Fieldset>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </Fieldset>

          <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <Button variant="green">Save changes</Button>
            </Dialog.Close>
          </Flex>

          <Dialog.Close asChild>
            <IconButton aria-label="Close">
              <X size={24} />
            </IconButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
