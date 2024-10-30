'use client'

import NextButtonIcon from '@/icons/next-button-icon'
import PrevButtonIcon from '@/icons/prev-button-icon'
import { useSessionStore } from '@/stores/session'
import { useState } from 'react'

export default function CalenderLine () {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [classTypes, setClassType] = useState('next')
  const isStudent = useSessionStore(store => store.user?.role === 'student')

  function isToday (classDate: Date): boolean {
    return (
      currentDate.getFullYear() === classDate.getFullYear() &&
        currentDate.getMonth() === classDate.getMonth() &&
        currentDate.getDate() === classDate.getDate()
    )
  }

  // Función para generar los próximos 5 días a partir de hoy
  const generateFiveDays = (date: Date) => {
    const daysOfWeek = []
    for (let i = 0; i < 5; i++) {
      const day = new Date(date)
      day.setDate(date.getDate() + i)
      daysOfWeek.push(day)
    }
    return daysOfWeek
  }

  const prevDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() - 1)
      return newDate
    })
  }

  const nextDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() + 1)
      return newDate
    })
  }

  const daysOfWeek = generateFiveDays(currentDate)
  const currentMonth = currentDate.toLocaleString('es-ES', { month: 'long' })
  const currentDayOfWeek = currentDate.toLocaleString('es-ES', { weekday: 'long' })
  const currentDayOfMonth = currentDate.getDate()

  return (
    <>
      <div className="">
        <h2 className="pl-4 pt-6 text-2xl font-semibold"> {currentDayOfWeek} {currentDayOfMonth} de {currentMonth} </h2>

        <div className="flex justify-center items-center m-6 flex-col">
          <div className="flex space-x-10 m-2">
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
              >
                <div className="text-xs w-2 text-muted-foreground">{formatDay(day)}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center w-72 h-9 ">
            <div className="flex m-0 items-center border-2 justify-center bg-card w-72 h-9 rounded-lg">
              {/* Botón de días anteriores */}
              <button
                onClick={prevDay}
                className="w-8 h-7 flex justify-start items-center"
              >
                <PrevButtonIcon />
              </button>

              {/* Calendario con 5 días */}
              <div className="flex items-center space-x-4">
                {daysOfWeek.map((day, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-lg flex justify-center items-center font-semibold ${isToday(day) ? 'bg-primary text-card' : ''} border-none`}
                  >
                    <div className="text-xs text[#263238]">{formatDate(day)}</div>
                  </div>
                ))}
              </div>

              {/* Botón de siguientes días */}
              <button
                onClick={nextDay}
                className="w-8 h-7  flex justify-center items-center"
              >
                <NextButtonIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isStudent && <div className="flex justify-center items-center">
        <div className="flex justify-center w-72 h-8 rounded m-6 text-[12px] text-muted-foreground bg-border">
          <div className="flex justify-center items-center w-44">
            <button
              onClick={() => { setClassType('next') }}
              className={`w-[94%] h-[90%] rounded ${classTypes === 'next' ? 'bg-white text-black' : 'bg-border text-muted-foreground'}`}
            >
              <p>próximas</p>
            </button>
          </div>
          <div className="flex justify-center items-center w-44">
            <button
              onClick={() => { setClassType('prev') }}
              className={`w-[94%] h-[90%] rounded ${classTypes === 'prev' ? 'bg-white text-black' : 'bg-border text-muted-foreground'}`}
            >
              <p>Realizadas</p>
            </button>
          </div>
        </div>
      </div>}
    </>
  )
}

// Formato de funciones tipadas en TypeScript
const formatDay = (date: Date): string => {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  return days[date.getDay() - 1] ?? 'D'
}

const formatDate = (date: Date): number => date.getDate()
