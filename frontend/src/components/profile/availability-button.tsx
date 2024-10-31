import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function AvailabilityButton ({ children, edit, selected, onClick }: {
  children: React.ReactNode
  edit: boolean
  selected: boolean
  onClick: () => void
}) {
  return (
    <Button
      className={cn('font-bold border py-1 px-2', selected
        ? 'text-white'
        : '', selected
        ? edit
          ? 'bg-chart-3'
          : 'bg-muted-foreground text-background'
        : edit
          ? ''
          : 'hover:bg-background hover:text-foreground'
      )}
      variant={selected ? 'default' : 'outline'}
      onClick={edit ? onClick : undefined}
    >
      {children}
    </Button>
  )
}
