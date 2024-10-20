'use client'

import Link from 'next/link'
import HomeIcon from '@/icons/home'
import CalendarIcon from '@/icons/calendar'
import AcademicCapIcon from '@/icons/academic-cap'
import PencilAltIcon from '@/icons/pencil-alt'
import { useSessionStore } from '@/stores/session'

const links = [
  {
    path: '/',
    name: 'Inicio',
    icon: HomeIcon
  },
  {
    path: '/',
    name: 'Agenda',
    icon: CalendarIcon
  },
  {
    path: '/',
    name: 'Profesores',
    icon: AcademicCapIcon
  },
  {
    path: '/',
    name: 'Alumnos',
    icon: PencilAltIcon
  }
]

export default function Navbar () {
  const sessionUser = useSessionStore(store => store.user)

  return sessionUser === undefined
    ? null
    : (
    <nav className='sticky bottom-0 flex py-4 px-8 justify-between bg-secondary'>
      {links.map(link => <Link
        key={link.name}
        href={link.path}
        className='flex flex-col items-center gap-y-1 text-[#607D8B]'
      >
        <span className='bg-background p-3 rounded-md flex'>
          <link.icon />
        </span>
        <span className='text-xs text-center'>
          {link.name}
        </span>
      </Link>)}
    </nav>
      )
}
