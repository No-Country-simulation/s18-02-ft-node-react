import { cn } from '@/lib/utils'

export default function Logo ({ size }: { size?: number }) {
  return (
    <div className={cn('rounded-full bg-gray-500', size !== undefined ? `size-${size}` : 'size-20')}>
    </div>
  )
}
