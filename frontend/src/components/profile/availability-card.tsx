'use client'

import { useState } from 'react'
import AvailabilityButton from './availability-button'

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const schedules = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

export default function AvailabilityCard ({ availability, edit, onChange }: {
  availability: TeacherUser['schedulePreferences']
  edit: boolean
  onChange: (days: string[], schedules: string[]) => void
}) {
  const [selectedDays, setSelectedDays] = useState<string[]>(Object.entries(availability)
    .reduce((prev: string[], [key, value]) => typeof value === 'object' && value.length > 0 ? [...prev, key] : prev, [])
  )
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>(Object.entries(availability)
    .find(([key, value]) => typeof value === 'object' && value.length > 0)?.[1] as string[] ?? []
  )

  return (
    <div
      className='py-6 px-4 bg-card border rounded-md space-y-4'
    >
      <section>
        <strong>Dias de la semana</strong>
        <ol className='flex flex-wrap gap-y-4 gap-x-2 mt-4'>
          {days.map(day => {
            return <AvailabilityButton
              key={day}
              selected={selectedDays.includes(day)}
              edit={edit}
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
              {day.toUpperCase()}
            </AvailabilityButton>
          })}
        </ol>
      </section>
      <section>
        <strong>Horarios disponibles</strong>
        <ol className='flex flex-wrap gap-y-4 gap-x-2 mt-4'>
          {schedules.map(schedule => {
            return <AvailabilityButton
              key={schedule}
              selected={selectedSchedules.includes(schedule)}
              edit={edit}
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
            </AvailabilityButton>
          })}
        </ol>
      </section>
    </div>
  )
}
