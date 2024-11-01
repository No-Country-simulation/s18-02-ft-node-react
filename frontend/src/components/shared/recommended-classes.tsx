import { cn } from '@/lib/utils'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import TeacherCard from '../teacher-card'
import { Button } from '../ui/button'
import { TEACHERS } from '@/lib/constants'
import api from '@/lib/server/api'

export default async function RecommendedClasses ({ loged }: { loged: boolean }) {
  let teachers

  try {
    const res = await api.getTeachers()
    teachers = res.payload.docs
  } catch (error) {
    console.error(error)
  }

  console.log(teachers)

  return (
    <section className={cn('px-5 py-6', loged ? 'pb-0' : '')}>
      <h2 className={cn('font-bold text-2xl', loged ? '' : 'text-center')}>Clases recomendadas</h2>
      <Carousel
        opts={{
          align: 'start'
        }}
      >
        <CarouselContent className='gap-x-2 -ml-2 mt-4'>
          {TEACHERS.map(teacher => <CarouselItem
            key={teacher.id}
            className='carouselItem max-w-sm pl-2 basis-auto'
          >
            <TeacherCard teacher={teacher}/>
          </CarouselItem>)}
        </CarouselContent>
      </Carousel>
      {loged && <Button className='w-full mt-6'>Reserver una clase</Button>}
    </section>
  )
}
