'use client'

import LeftArroowIcon from '@/icons/left-arrow'
import { Button } from '../ui/button'
import BellIcon from '@/icons/bell'
import { Badge } from '../ui/badge'
import { useUserStore } from '@/stores/user'
import { usePathname } from 'next/navigation'
import { UserCircle } from 'lucide-react'
import UserAvatar from './user-avatar'

export default function Header () {
  const pathname = usePathname()
  const user = useUserStore(store => store.user)

  const onBack = () => {
    if (typeof window !== 'undefined') window.history.back()
  }

  return (
    <header className='sticky z-50 top-0 flex justify-between items-center p-4 bg-secondary'>
      <div
        className='flex items-center gap-x-2 cursor-pointer'
        onClick={onBack}
      >
        {pathname === '/'
          ? <>
          <div className='size-10 rounded-full bg-primary'></div>
          <h2 className='font-semibold'>Logo</h2>
        </>
          : <>
          <LeftArroowIcon className='size-8' />
          <h2 className='font-semibold'>Mi perfil</h2>
        </>}
      </div>

      <div className='flex gap-x-4'>
        <Button
          variant='outline'
          size='icon'
          className='relative'
        >
          <BellIcon />
          <Badge
            variant='destructive'
            className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 px-[7px] py-0.5'
          >
            5
          </Badge>
        </Button>

        {user === undefined
          ? <UserCircle className='size-10' />
          : <UserAvatar user={user}/>
        }
      </div>
    </header>
  )
}
