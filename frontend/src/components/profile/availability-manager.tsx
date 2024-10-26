'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import AvailabilityCard from './availability-card'

const availabilityTimes: Array<TeacherUser['schedulePreferences']> = [
  {
    id: 'hola',
    monday: [],
    tuesday: ['10:00'],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  }
]

export default function AvailabilityManager ({ user }: { user: TeacherUser }) {
  const [edit, setEdit] = useState(false)
  const [availabilities, setAvailabilities] = useState(availabilityTimes)

  return (
    <>
      <section>
        <ol className='grow space-y-6'>
          {availabilities.map(availability => <AvailabilityCard
            key={availability.id}
            availability={availability}
            edit={edit}
            onChange={(days, schedules) => {
              setAvailabilities(avs => avs.map(av => {
                if (av.id === availability.id) {
                  for (const day of days) {
                    av[day as Exclude<keyof TeacherUser['schedulePreferences'], 'id'>] = schedules
                  }
                }

                return av
              }))
            }}
            deleteAvailability={() => { setAvailabilities(avs => avs.filter(av => av.id !== availability.id)) }}
          />)}
        </ol>
        {edit && <Button
          variant='outline'
          className='w-full mt-6'
          onClick={() => {
            setAvailabilities(avs => [...avs, {
              id: crypto.randomUUID(),
              monday: [],
              tuesday: [],
              wednesday: [],
              thursday: [],
              friday: [],
              saturday: [],
              sunday: []
            }])
          }}
        >
          Añadir nueva disponibilidad
        </Button>}
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
          onClick={() => {
            setEdit(false)
            console.log(availabilities)
          }}
        >Confirmar</Button>
      </section>
    </>
  )
}
