'use client'

import { buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import MailOpenIcon from '@/icons/mail-open'
import Link from 'next/link'

export function VerifyEmail ({ email, open }: {
  email: string
  open: boolean
}) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center text-muted-foreground'>
            <MailOpenIcon />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='text-pretty text-center'>
          Enviamos un coreo a {email} con un enlace para confirmar tu registro.
        </DialogDescription>
        <DialogFooter>
          <Link className={buttonVariants()} href='/'>Ir a home</Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
