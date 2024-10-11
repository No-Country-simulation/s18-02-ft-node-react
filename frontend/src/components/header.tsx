'use client'

import LeftArroowIcon from '@/icons/left-arrow'
import { Button } from './ui/button'
import BellIcon from '@/icons/bell'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage } from './ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'

export default function Header () {
  const onBack = () => {
    if (typeof window !== 'undefined') window.history.back()
  }

  return (
    <header className='sticky top-0 flex justify-between items-center p-4 bg-[#F3F3F3]'>
      <div
        className='flex items-center gap-x-2 cursor-pointer'
        onClick={onBack}
      >
        <LeftArroowIcon className='size-8' />
        <h2 className='font-semibold'>Mi perfil</h2>
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

        <Avatar className='rounded-lg'>
          <AvatarImage src='https://cdn.discordapp.com/attachments/1064289166462042139/1294011787653415073/image.png?ex=670975e3&is=67082463&hm=2086c291c17733af5e97620234e335d11d017de7f42d609df1b823505eccdaa9&' alt='user' />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
