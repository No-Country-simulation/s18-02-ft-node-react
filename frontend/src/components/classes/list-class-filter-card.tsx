'use client'

import BadgeIcon from '@/icons/badge-icon'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useState } from 'react'

// Interface for Class
interface Class {
  id: string
  name: string
  language: string
  time: string
  avatar: string
  date: string
  createdAt: Date
  updatedAt: Date
}

export default function ListClassFilterCard () {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [currentDate] = useState<Date>(new Date())

  // Toggle selection
  const handleSelect = (id: string) => {
    setSelectedId(selectedId === id ? null : id)
  }

  // Sample classes data
  const classes: Class[] = [
    {
      id: '1',
      time: '09:00',
      name: 'Mr Mario',
      language: 'Spanish',
      avatar: 'https://www.lavanguardia.com/files/image_449_220/files/fp/uploads/2023/01/21/63cbb2e286998.r_d.534-311-6101.png',
      date: '2024-10-29T15:30:00Z',
      createdAt: new Date('2024-10-29T15:30:00Z'),
      updatedAt: new Date('2002-02-11')
    },
    {
      id: '2',
      time: '10:00',
      name: 'Julio Gomes',
      language: 'English',
      avatar: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj5TRT5o2zoHv5DtuPNLYtujQCAr4uUu6dDkti73vHfUjtFUdOLO7qu639VOX_ZXcaFb4ASa12u0OLlG9MP_KUCY-hv2CMI4WTRLuA2lLVYgryl3ot86x_VKaSf87_5o8kfgoDuHIFQFRm45KuE--KBK1VACLuD4doOvWv1dujJQDEpnpQC3w/s512/00015-2782668338-Highly%20detailed%20portrait%20of%20eldm,%20stephen%20bliss,%20unreal%20engine,%20fantasy%20art%20by%20greg%20rutkowski,%20loish,%20rhads,%20ferdinand%20knab,%20mak.png',
      date: '2024-10-31T15:30:00Z',
      createdAt: new Date('2024-10-31T15:30:00Z'),
      updatedAt: new Date('2002-02-11')
    },
    {
      id: '3',
      time: '11:00',
      name: 'Juan Fernando',
      language: 'Spanish',
      avatar: 'https://f.rpp-noticias.io/2019/02/15/753296descarga-7jpg.jpg',
      date: '2024-10-30T15:30:00Z',
      createdAt: new Date('2024-10-30T15:30:00Z'),
      updatedAt: new Date('2002-02-11')
    }
  ]

  // Check if the class date is today
  const isToday = (classDate: Date): boolean =>
    currentDate.toDateString() === classDate.toDateString()

  // Check if the class date is tomorrow
  const isTomorrow = (classDate: Date): boolean => {
    const tomorrow = new Date(currentDate)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toDateString() === classDate.toDateString()
  }

  // Filter upcoming classes
  const upcomingClasses = classes.filter((classItem) => {
    const classDate = new Date(classItem.date)
    return !isToday(classDate) && !isTomorrow(classDate) && classDate > currentDate
  })

  // Group classes by date
  const groupedByDate = new Map<string, Class[]>()
  upcomingClasses.forEach((classItem) => {
    const formattedDate = new Date(classItem.date).toLocaleDateString()
    if (!groupedByDate.has(formattedDate)) {
      groupedByDate.set(formattedDate, [])
    }
    groupedByDate.get(formattedDate)?.push(classItem)
  })

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Today's Classes */}
      <ul className="flex flex-col gap-3 items-center">
        <h3 className="w-72 text-black">Hoy</h3>
        {classes.filter(classItem => isToday(new Date(classItem.date))).map((classItem) => (
          <li key={classItem.id} onClick={() => { handleSelect(classItem.id) }} className="w-72 h-[58px] flex bg-border rounded-md cursor-pointer">
            <p className="h-[58px] w-16 text-1xl flex justify-center items-center">{classItem.time}</p>
            {selectedId !== classItem.id && (
              <div className="flex w-60 items-center justify-between bg-card rounded-md">
                <div className="flex items-center space-x-3 m-3">
                  <Avatar>
                    <AvatarImage className="w-10 h-10 rounded-full" src={classItem.avatar} />
                    <AvatarFallback />
                  </Avatar>
                  <div>
                    <h2>{classItem.name}</h2>
                    <p className="text-xs text-border">{classItem.language}</p>
                  </div>
                </div>
                <i className="m-3">
                  <BadgeIcon />
                </i>
              </div>
            )}

            {selectedId === classItem.id && (
              <div className={'flex w-[76%] justify-end items-center text-muted-foreground'}>
                <button className="flex items-center justify-center w-28 h-8 border rounded-md border-muted-foreground">
                  <p>Eliminar</p>
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Tomorrow's Classes */}
      <ul className="flex flex-col gap-3 items-center">
        <h3 className="w-72 text-black">Mañana</h3>
        {classes.filter(classItem => isTomorrow(new Date(classItem.date))).map((classItem) => (
          <li key={classItem.id} onClick={() => { handleSelect(classItem.id) }} className="w-72 h-[58px] flex bg-border rounded-md cursor-pointer">
            <p className="h-[58px] w-16 text-1xl flex justify-center items-center">{classItem.time}</p>
            {selectedId !== classItem.id && (
              <div className="flex w-60 items-center justify-between bg-white rounded-md">
                <div className="flex items-center space-x-3 m-3">
                  <Avatar>
                    <AvatarImage className="w-10 h-10 rounded-full" src={classItem.avatar} />
                    <AvatarFallback />
                  </Avatar>
                  <div>
                    <h2>{classItem.name}</h2>
                    <p className="text-xs text-border">{classItem.language}</p>
                  </div>
                </div>
                <i className="m-3">
                  <BadgeIcon />
                </i>
              </div>
            )}

            {selectedId === classItem.id && (
              <div className={'flex w-[76%] justify-end items-center text-muted-foreground'}>
                <button className="flex items-center justify-center w-28 h-8 border rounded-md border-muted-foreground">
                  <p>Eliminar</p>
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Grouped Classes by Date */}
      <ul className="flex flex-col gap-3 items-center">
        {Array.from(groupedByDate).map(([date, classItems]) => (
          <div key={date} className="w-full">
            <h3 className="text-sm text-black mb-2">{date}</h3>
            {classItems.map((classItem) => (
              <li key={classItem.id} onClick={() => { handleSelect(classItem.id) }} className={'w-72 h-[58px] flex bg-border rounded-md cursor-pointer'}>
                <p className="h-[58px] w-16 text-1xl flex justify-center items-center">{classItem.time}</p>
                {selectedId !== classItem.id && (
                  <div className="flex w-60 items-center justify-between bg-white rounded-md">
                    <div className="flex items-center space-x-3 m-3">
                      <Avatar>
                        <AvatarImage className="w-10 h-10 rounded-full" src={classItem.avatar} />
                        <AvatarFallback />
                      </Avatar>
                      <div>
                        <h2>{classItem.name}</h2>
                        <p className="text-xs text-border">{classItem.language}</p>
                      </div>
                    </div>
                    <i className="m-3">
                      <BadgeIcon />
                    </i>
                  </div>
                )}

                {selectedId === classItem.id && (
                  <div className={'flex w-[76%] justify-end items-center text-muted-foreground'}>
                    <button className="flex items-center justify-center w-28 h-8 border rounded-md border-muted-foreground">
                      <p>Eliminar</p>
                    </button>
                  </div>
                )}
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  )
}
