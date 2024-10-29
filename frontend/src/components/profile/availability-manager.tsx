'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import AvailabilityCard from './availability-card'
import api from '@/lib/client/api'

export default function AvailabilityManager ({ user }: { user: TeacherUser }) {
  const [edit, setEdit] = useState(false)
  const [availability, setAvailability] = useState(user.schedulePreferences)

  const handleClick = async () => {
    try {
      const data = await api.updatePreferences(availability)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <section>
        <AvailabilityCard
          availability={availability}
          edit={edit}
          onChange={(days, schedules) => {
            console.log('onChange', days, schedules)
            const availabilityUpdated: Record<string, string[]> = {
              monday: [],
              tuesday: [],
              wednesday: [],
              thursday: [],
              friday: [],
              saturday: [],
              sunday: []
            }
            for (const day of days) {
              if (availabilityUpdated[day] !== undefined) {
                availabilityUpdated[day] = schedules
              }
            }
            setAvailability(av => ({
              ...av,
              ...availabilityUpdated
            }))
          }}
        />
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
