'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export default function DatePicker ({ onChange, defaultValue }: {
  onChange: (value?: string) => void
  defaultValue?: string
}) {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (defaultValue === undefined) return

    try {
      return new Date(defaultValue)
    } catch (error) {
      return undefined
    }
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal flex border-input hover:bg-transparent hover:text-foreground',
            date === undefined && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date !== undefined ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date)
            onChange(date?.toJSON())
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
