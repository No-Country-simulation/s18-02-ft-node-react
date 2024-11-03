/* eslint-disable @next/next/no-img-element */
import CommentCard from '@/components/comment-card'
import { Faq } from '@/components/faq'
import SearchBar from '@/components/search-bar'
import Footer from '@/components/shared/footer'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { COMMENTS, NEXT_CLASSES, TEACHERS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import ClassCard from '@/components/class-card'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import UserCard from '@/components/user-card'
import { Badge } from '@/components/ui/badge'
import TrendingUpIcon from '@/icons/trending-up'
import TrendingDownIcon from '@/icons/trending-down'
import ClassChart from '@/components/class-chart'
import RecommendedClasses from '@/components/shared/recommended-classes'
import { getSessionUser } from '@/lib/server'

export const dynamic = 'force-dynamic'

export default async function Home () {
  const { payload: sessionUser } = await getSessionUser()

  const loged = sessionUser !== undefined

  return (<>
      <main>
        {loged || <section className='p-5 bg-white'>
          <h1 className='text-3xl font-bold text-black'>Todas tus clases particulares en un solo lugar.</h1>
          <img src="/images/class.png" alt="class image" />
        </section>}

        <SearchBar />

        {loged || <section className='px-5 py-8 flex flex-col items-center gap-y-6 bg-card'>
          <h2 className='text-2xl font-bold h3'>Como funciona</h2>
          <ul className='flex flex-col items-center gap-y-6'>
            <article>
              <div className='relative p-4 rounded-md max-w-[300px] bg-border'>
                <img src='/images/student.png' alt='Student image' />
                <span className='absolute block bg-foreground text-background px-3 font-bolde text-3xl rounded-md bottom-0 right-1/2 translate-x-1/2 translate-y-1/2'>1</span>
              </div>
              <h3 className='text-xl font-semibold text-center mt-8'>Elige la materia</h3>
            </article>
            <article>
              <div className='relative p-4 rounded-md max-w-[300px] bg-border'>
                <img src='/images/student.png' alt='Student image' />
                <span className='absolute block bg-foreground text-background px-3 font-bolde text-3xl rounded-md bottom-0 right-1/2 translate-x-1/2 translate-y-1/2'>2</span>
              </div>
              <h3 className='text-xl font-semibold text-center mt-8'>Busca tu profesor particular</h3>
            </article>
            <article>
              <div className='relative p-4 rounded-md max-w-[300px] bg-border'>
                <img src='/images/student.png' alt='Student image' />
                <span className='absolute block bg-foreground text-background px-3 font-bolde text-3xl rounded-md bottom-0 right-1/2 translate-x-1/2 translate-y-1/2'>3</span>
              </div>
              <h3 className='text-xl font-semibold text-center mt-8'>Agenda una clase</h3>
            </article>
          </ul>
        </section>}

        {loged && <section className='px-5 py-6 pb-0 space-y-4'>
          <h2 className='text-2xl font-bold'>Próximas clases</h2>
          <Carousel
            opts={{
              align: 'start'
            }}
          >
            <CarouselContent className='gap-x-2 -ml-2'>
              {NEXT_CLASSES.map(nextClass => <CarouselItem
                key={nextClass.id}
                className='carouselItem max-w-sm pl-2 basis-auto'
              >
                <ClassCard nextClass={nextClass} sessionUser={sessionUser}/>
              </CarouselItem>)}
            </CarouselContent>
          </Carousel>
        </section>}

        {sessionUser?.role === 'teacher' && <>
          <section className='pt-6 px-5 flex gap-x-4'>
            <article className='bg-secondary rounded-lg p-4 space-y-3'>
              <strong className='text-muted-foreground'>Clases reservadas</strong>
              <div className='flex justify-between items-center'>
                <span className='text-5xl font-bold'>43</span>
                <Badge
                  variant='outline'
                  className='px-3 py-2 rounded-md border-green-500 text-green-500'
                ><TrendingUpIcon className='mr-2'/>17%</Badge>
              </div>
              <span className='block text-sm'>vs Agosto, 2024</span>
            </article>
            <article className='bg-muted rounded-lg p-4 space-y-3 text-background'>
              <strong>Clases canceladas</strong>
              <div className='flex justify-between items-center'>
                <span className='text-5xl font-bold'>03</span>
                <Badge
                  variant='outline'
                  className='px-3 py-2 rounded-md border-foreground'
                ><TrendingDownIcon className='mr-2 size-4'/> 5%</Badge>
              </div>
              <span className='block text-sm'>vs Agosto, 2024</span>
            </article>
          </section>

          <section className='px-5 py-6 pb-0'>
            <h2 className='font-bold text-2xl mb-4'>Mi rendimiento anual</h2>
            <ClassChart />
            <Link
              href={`/profile/${sessionUser.username}/availability`}
              className={cn(buttonVariants({ variant: 'outline' }), 'border-primary w-full mt-4')}
            >Configurar tus horarios del mes</Link>
          </section>
        </>}

        {sessionUser?.role !== 'teacher' && <RecommendedClasses loged={loged}/>}

        {loged || <section className='py-8 px-12 bg-foreground flex flex-col items-center gap-y-5'>
          <p className='text-background text-center text-pretty'>Únete a nuestra comunidad de profesores particulares y conecta con alumnos que buscan mejorar en tus materias. Regístrate ahora, establece tu propio horario.</p>
          <Link
            href='/register'
            className={cn(buttonVariants(), 'max-w-40 w-full')}
          >Regístrate</Link>
        </section>}

        {loged && <section className='px-5 py-6 space-y-4'>
          <h2 className='text-2xl font-bold'>Mis {sessionUser?.role === 'teacher' ? 'alumnos' : 'profesores'} recientes</h2>
          <ul className='space-y-4'>
            {TEACHERS.map(teacher => <UserCard key={teacher.id} user={teacher} classes={3}/>)}
          </ul>
        </section>}

        {loged || <section className='px-5 py-8 space-y-6'>
          <h2 className='text-2xl font-bold text-center'>Preguntas frecuentes</h2>
          <Faq />
          <Carousel
            opts={{
              align: 'start'
            }}
          >
            <CarouselContent className='gap-x-2'>
              {COMMENTS.map(comment => <CarouselItem
                key={comment.id}
                className='pl-2 basis-auto'
              >
                <CommentCard comment={comment}/>
              </CarouselItem>)}
            </CarouselContent>
          </Carousel>
        </section>}
      </main>
      {loged || <Footer />}
    </>
  )
}
