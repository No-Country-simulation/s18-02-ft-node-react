import RatingStars from './rating-stars'
import ClassModeBadge from './shared/class-mode-badge'
import SubjectsList from './subjects-list'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function ClassCard ({ user }: { user: TeacherUser }) {
  return (
    <Card className='max-w-sm rounded-lg'>
      {user.avatar !== undefined && <img className='rounded-lg w-full' src={user.avatar} alt={`Avatar of ${user.username}`} />}
      <CardHeader className='flex-row justify-between items-center'>
        <CardTitle>Card Title</CardTitle>
        <RatingStars rating={3.5} />
      </CardHeader>
      <CardContent className='space-y-2'>
        {user.subjects !== undefined && <SubjectsList subjects={user.subjects}/>}
        {user.description !== undefined && <CardDescription>{user.description}</CardDescription>}
      </CardContent>
      <CardFooter className='flex justify-between'>
        <span className='font-bold text-3xl'>$99/h</span>
        <div className='flex gap-x-2'>
          <p>Disponible 04/07</p>
          <ClassModeBadge classMode={user.classMode}/>
        </div>
      </CardFooter>
    </Card>
  )
}
