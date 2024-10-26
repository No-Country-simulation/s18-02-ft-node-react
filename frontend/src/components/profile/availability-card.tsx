'use client'

import { Button } from '@/components/ui/button'
import XIcon from '@/icons/x'
import { useEffect, useState } from 'react'

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const schedules = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

export default function AvailabilityCard ({ availability, edit, onChange, deleteAvailability }: {
  availability: TeacherUser['schedulePreferences']
  edit: boolean
  onChange: (days: string[], schedules: string[]) => void
  deleteAvailability: () => void
}) {
  const [selectedDays, setSelectedDays] = useState<string[]>(Object.entries(availability)
    .reduce((prev: string[], [key, value]) => typeof value === 'object' && value.length > 0 ? [...prev, key] : prev, [])
  )
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>(Object.entries(availability)
    .find(([key, value]) => typeof value === 'object' && value.length > 0)?.[1] as string[] ?? []
  )

  useEffect(() => {
    console.log(selectedDays, selectedSchedules)
  }, [])

  return (
    <li
      className='py-6 px-4 bg-background border rounded-md space-y-4'
    >
      <section>
        <strong>Dias de la semana</strong>
        <ol className='flex flex-wrap gap-y-4 gap-x-2 mt-4'>
          {days.map(day => {
            return <Button
              key={day}
              className='py-1 px-2'
              variant={selectedDays.includes(day) ? 'default' : 'outline'}
              disabled={!edit}
              onClick={() => {
                let updatedSelectedDays

                if (selectedDays.includes(day)) {
                  updatedSelectedDays = selectedDays.filter(selectedDay => selectedDay !== day)
                } else {
                  updatedSelectedDays = [...selectedDays, day]
                }
                setSelectedDays(updatedSelectedDays)
                onChange(updatedSelectedDays, selectedSchedules)
              }}
            >
              {day.toLowerCase()}
            </Button>
          })}
        </ol>
      </section>
      <section>
        <strong>Horarios disponibles</strong>
        <ol className='flex flex-wrap gap-y-4 gap-x-2 mt-4'>
          {schedules.map(schedule => {
            return <Button
              key={schedule}
              className='py-1 px-2'
              variant={selectedSchedules.includes(schedule) ? 'default' : 'outline'}
              disabled={!edit}
              onClick={() => {
                let updatedSelectedSchedules

                if (selectedSchedules.includes(schedule)) {
                  updatedSelectedSchedules = selectedSchedules.filter(selectedSchedule => selectedSchedule !== schedule)
                } else {
                  updatedSelectedSchedules = [...selectedSchedules, schedule]
                }
                setSelectedSchedules(updatedSelectedSchedules)
                onChange(selectedDays, updatedSelectedSchedules)
              }}
            >
              {schedule}
            </Button>
          })}
        </ol>
      </section>
      {edit && <Button
        variant='link'
        onClick={deleteAvailability}
      >
        <XIcon /> Eliminar disponibilidad
      </Button>}
    </li>
  )
}
