'use client'

import { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { cn } from '@/lib/utils'

const classModes: Array<TeacherUser['classMode']> = ['remoto', 'presencial']
type ClassMode = TeacherUser['classMode']

export default function ClassModeSelector ({ defaultValue, onChangeValue }: {
  defaultValue: ClassMode
  onChangeValue: (value: ClassMode) => void
}) {
  const [classMode, setClassMode] = useState(defaultValue)

  return (
    <div className='flex gap-4'>
      {classModes.map(mode => <label
        key={mode}
        className={cn('flex items-center gap-x-2 text-xs cursor-pointer', mode !== classMode ? 'text-muted-foreground' : '')}
      >
        <Checkbox
          className={cn('size-4 block', mode !== classMode ? 'border-muted-foreground' : '')}
          checked={mode === classMode}
          onCheckedChange={() => {
            setClassMode(mode)
            onChangeValue(mode)
          }}
        />
        {mode.toUpperCase()}
      </label>)}
    </div>
  )
}
