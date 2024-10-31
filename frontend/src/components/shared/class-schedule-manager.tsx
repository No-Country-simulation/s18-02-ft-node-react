'use client'

import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import XIcon from '@/icons/x'
import { useSessionStore } from '@/stores/session'
import Link from 'next/link'

export function ClassScheduleManager ({ availability, schedules }: {
  availability: TeacherUser['schedulePreferences']
  schedules: string[]
}) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const dateFormated = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(date)
  const [edit, setEdit] = useState(false)
  const [selectedSchedules] = useState<string[]>(Object.entries(availability)
    .find(([key, value]) => typeof value === 'object' && value.length > 0)?.[1] as string[] ?? []
  )
  const [schedulesEdited, setSchedulesEdited] = useState<string[]>(schedules)
  const sessionUser = useSessionStore(store => store.user)

  const handleClick = () => {
    setEdit(false)
  }

  return (
    <>
      <h1 className='text-2xl font-bold'>{dateFormated.at(0)?.toUpperCase() + dateFormated.slice(1)}</h1>
      <section>
        <h2 className='mb-2 font-semibold'>Disponibilidad mensual</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border bg-card"
        />
      </section>

      <section>
        <h2 className='mb-2 font-semibold'>Disponibilidad horaria</h2>
        <ol className='py-5 px-4 bg-card flex flex-wrap gap-2 border rounded-lg'>
          {schedulesEdited.map(schedule => <li
            key={schedule}
            className={cn('border py-1 px-2 rounded font-semibold flex gap-x-1 items-center', selectedSchedules.includes(schedule) ? 'bg-chart-3 text-white border-transparent' : '')}
          >{schedule}{edit && !selectedSchedules.includes(schedule)
            ? <XIcon
              className='size-4 cursor-pointer'
              onClick={() => {
                setSchedulesEdited(scs => scs.filter(s => s !== schedule))
              }}
            />
            : ''
          }</li>)}
        </ol>
      </section>

      {(sessionUser?.role === 'teacher' && edit) && <Link
        href={`/profile/${sessionUser.username}/availability`}
        className={cn(buttonVariants({ variant: 'outline' }), 'border-primary w-full')}
      >Configurar tus horarios del mes</Link>}

      <section className='flex gap-x-4'>
        <Button
          variant='outline'
          className='w-full border-primary'
          disabled={edit}
          onClick={() => { setEdit(true) }}
        >Editar</Button>
        <Button
          className='w-full'
          disabled={!edit}
          onClick={handleClick}
        >Confirmar</Button>
      </section>
    </>
  )
}
