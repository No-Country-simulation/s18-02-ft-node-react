import RatingStars from './rating-stars'
import ClassModeBadge from './shared/class-mode-badge'
import SubjectsList from './subjects-list'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function TeacherCard ({ teacher }: { teacher: TeacherUser }) {
  return (
    <Card className='max-w-sm rounded-lg'>
      {teacher.avatar !== undefined && <img className='rounded-lg w-full' src={teacher.avatar} alt={`Avatar of ${teacher.username}`} />}
      <CardHeader className='flex-row justify-between items-center'>
        <CardTitle>Card Title</CardTitle>
        <RatingStars rating={3.5} />
      </CardHeader>
      <CardContent className='space-y-2'>
        {teacher.subjects !== undefined && <SubjectsList subjects={teacher.subjects}/>}
        {teacher.description !== undefined && <CardDescription>{teacher.description}</CardDescription>}
      </CardContent>
      <CardFooter className='flex justify-between'>
        <span className='font-bold text-2xl'>$99/h</span>
        <div className='flex gap-x-2'>
          <p>Disponible 04/07</p>
          <ClassModeBadge classMode={teacher.classMode}/>
        </div>
      </CardFooter>
    </Card>
  )
}