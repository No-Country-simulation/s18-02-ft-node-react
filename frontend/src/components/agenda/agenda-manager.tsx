'use client'

import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import XIcon from '@/icons/x'

const schedules = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

export function AgendaManager ({ availability }: {
  availability: TeacherUser['schedulePreferences']
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

  console.log(availability, selectedSchedules)

  const handleClick = () => {
    console.log('editando..')
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
          {schedules.map(schedule => <li
            key={schedule}
            className={cn('border py-1 px-2 rounded font-semibold flex gap-x-1 items-center', selectedSchedules.includes(schedule) ? 'bg-chart-3 text-white border-transparent' : '')}
          >{schedule}{edit && !selectedSchedules.includes(schedule) ? <XIcon className='size-4 cursor-pointer'/> : ''}</li>)}
        </ol>
      </section>

      <section className='flex gap-x-4'>
        <Button
          variant='outline'
          className='w-full'
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
