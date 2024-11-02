'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import XIcon from '@/icons/x'

const subjects = ['Matemáticas', 'Física', 'Química', 'Biología', 'Historia', 'Lengua']

export default function SubjectsSelector ({ defaultValue, onChangeValue }: {
  defaultValue: string[]
  onChangeValue: (value: string[]) => void
}) {
  const [selectedSubjects, setSelectedSubjects] = useState(defaultValue)

  const changeSelectedSubjects = (newSelectedSubjects: string[]) => {
    setSelectedSubjects(newSelectedSubjects)
    onChangeValue(newSelectedSubjects)
  }

  return (
    <>
      <Select onValueChange={(value) => {
        if (selectedSubjects.includes(value)) return
        const newSelectedSubjects = [...selectedSubjects, value]
        changeSelectedSubjects(newSelectedSubjects)
      }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona las materias" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {subjects.map(subject => <SelectItem
              key={subject}
              value={subject}
            >{subject}</SelectItem>)}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ol className='flex gap-2 flex-wrap'>
        {selectedSubjects.map(subject => <li
          key={subject}
          className='px-2 py-1 flex items-center gap-x-1 border border-border rounded text-sm'
        >
          <span>{subject}</span>
          <button onClick={() => {
            const newSelectedSubjects = selectedSubjects.filter(s => s !== subject)
            changeSelectedSubjects(newSelectedSubjects)
          }}><XIcon className='size-4'/></button>
        </li>)}
      </ol>
    </>
  )
}
