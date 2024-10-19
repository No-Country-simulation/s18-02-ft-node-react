import { buttonVariants } from '@/components/ui/button'
import EmojiSadIcon from '@/icons/emoji-sad'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound () {
  return (
    <main className='p-4 max-w-md mx-auto'>
      <section>
        <EmojiSadIcon className='mx-auto' />
        <h1 className='text-8xl font-bold text-center mt-8'>404</h1>
        <div className='mt-8'>
          <h2 className='text-center font-semibold text-4xl'>Página no encontrada</h2>
          <p className='text-center text-muted-foreground text-pretty mt-4'>Lo sentimos, no encontramos la página que requieres, por favor regresa al home.</p>
        </div>
      </section>
      <Link href="/" className={cn(buttonVariants({ variant: 'default' }), 'w-full mt-32')}>Ir al inicio</Link>
    </main>
  )
}
