'use client'

import LeftArroowIcon from '@/icons/left-arrow'
import { Button } from '../ui/button'
import BellIcon from '@/icons/bell'
import { Badge } from '../ui/badge'
import { useSessionStore } from '@/stores/session'
import { usePathname } from 'next/navigation'
import { UserCircle } from 'lucide-react'
import UserAvatar from './user-avatar'
import Link from 'next/link'
import LogoIcon from '@/icons/logo'
import TeachAppIcon from '@/icons/teach-app'

// Mi perfil, Perfil, Mis clases, Mis profesores, Mis alumnos, Reserva una clase, Mi agenda, Mi clase, Elige un día

export default function Header () {
  const pathname = usePathname()
  const sessionUser = useSessionStore(store => store.user)

  const onBack = () => {
    if (typeof window !== 'undefined') window.history.back()
  }

  const getName = () => {
    if (pathname.includes('/profile')) {
      if (sessionUser?.username !== undefined && pathname.includes(sessionUser.username)) {
        return 'Mi perfil'
      } else {
        return 'Perfil'
      }
    }

    if (pathname.includes('agenda')) return 'Mi agenda'

    return 'Nombrando...'
  }

  return (
    <header className='sticky z-50 top-0 flex justify-between items-center p-4 bg-secondary rounded-b-lg'>
      <div
        className={'flex items-center cursor-pointer ' + (pathname === '/' ? 'gap-x-3' : 'gap-x-2')}
        onClick={onBack}
      >
        {pathname === '/'
          ? <>
          <LogoIcon className='size-6' />
          <TeachAppIcon className='h-6 w-auto' />
        </>
          : <>
          <LeftArroowIcon className='size-8' />
          <h2 className='font-semibold'>{getName()}</h2>
        </>}
      </div>

      <div className='flex gap-x-4'>
        <Button
          size='icon'
          className='relative [&_svg]:size-5 bg-background'
        >
          <BellIcon className='text-muted' />
          <Badge
            variant='destructive'
            className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 px-[7px] py-0.5 text-background'
          >
            5
          </Badge>
        </Button>

        {sessionUser === undefined
          ? <Link href='/login'>
            <UserCircle className='size-10' />
          </Link>
          : <Link href={`/profile/${sessionUser.username}`}>
            <UserAvatar user={sessionUser} />
          </Link>
        }
      </div>
    </header>
  )
}
