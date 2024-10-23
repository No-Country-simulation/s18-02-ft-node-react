'use client'

import TeacherCard from '@/components/teacher-card'
import CommentCard from '@/components/comment-card'
import { Faq } from '@/components/faq'
import SearchBar from '@/components/search-bar'
import Footer from '@/components/shared/footer'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { COMMENTS, NEXT_CLASSES, TEACHERS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import ClassCard from '@/components/class-card'
import { Button } from '@/components/ui/button'
import RecentTeacherCard from '@/components/recent-teacher-card'
import { useSessionStore } from '@/stores/session'

export default function Home () {
  const loged = useSessionStore(store => store.user !== undefined)

  return (<>
      <main>
        {loged || <section className='p-5'>
          <h1 className='text-3xl font-bold'>Todas tus clases particulares en un solo lugar.</h1>
          <img src="/images/class.png" alt="class image" />
        </section>}

        <SearchBar />

        {loged || <section className='px-5 py-8 flex flex-col items-center gap-y-6'>
          <h2 className='text-2xl font-bold h3'>Como funciona</h2>
          <ul className='flex flex-col items-center gap-y-6'>
            <article>
              <div className='relative p-4 rounded-md max-w-[300px] bg-gray-300'>
                <img src='/images/student.png' alt='Student image' />
                <span className='absolute block bg-foreground text-background px-3 font-bolde text-3xl rounded-md bottom-0 right-1/2 translate-x-1/2 translate-y-1/2'>1</span>
              </div>
              <h3 className='text-xl font-semibold text-center mt-8'>Elige la materia</h3>
            </article>
            <article>
              <div className='relative p-4 rounded-md max-w-[300px] bg-gray-300'>
                <img src='/images/student.png' alt='Student image' />
                <span className='absolute block bg-foreground text-background px-3 font-bolde text-3xl rounded-md bottom-0 right-1/2 translate-x-1/2 translate-y-1/2'>2</span>
              </div>
              <h3 className='text-xl font-semibold text-center mt-8'>Busca tu profesor particular</h3>
            </article>
            <article>
              <div className='relative p-4 rounded-md max-w-[300px] bg-gray-300'>
                <img src='/images/student.png' alt='Student image' />
                <span className='absolute block bg-foreground text-background px-3 font-bolde text-3xl rounded-md bottom-0 right-1/2 translate-x-1/2 translate-y-1/2'>3</span>
              </div>
              <h3 className='text-xl font-semibold text-center mt-8'>Agenda una clase</h3>
            </article>
          </ul>
        </section>}

        {loged && <section className='px-5 py-8 pb-0 bg-secondary space-y-6'>
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
                <ClassCard nextClass={nextClass}/>
              </CarouselItem>)}
            </CarouselContent>
          </Carousel>
        </section>}

        <section className={cn('px-5 py-8 bg-secondary space-y-6', loged ? 'pb-0' : '')}>
          <h2 className={cn('font-bold text-2xl', loged ? '' : 'text-center')}>Clases recomendadas</h2>
          <Carousel
            opts={{
              align: 'start'
            }}
          >
            <CarouselContent className='gap-x-2 -ml-2'>
              {TEACHERS.map(teacher => <CarouselItem
                key={teacher.id}
                className='carouselItem max-w-sm pl-2 basis-auto'
              >
                <TeacherCard teacher={teacher}/>
              </CarouselItem>)}
            </CarouselContent>
          </Carousel>
          {loged && <Button className='w-full'>Reserver una clase</Button>}
        </section>

        {loged && <section className='px-5 py-8 bg-secondary space-y-6'>
          <h2 className='text-2xl font-bold'>Mis profesores recientes</h2>
          <ul className='space-y-2'>
            <li>
              <RecentTeacherCard />
            </li>
            <li>
              <RecentTeacherCard />
            </li>
          </ul>
        </section>}

        {loged || <section className='px-5 py-8 space-y-6'>
          <h2 className='text-2xl font-bold text-center'>Preguntas freguntas</h2>
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
