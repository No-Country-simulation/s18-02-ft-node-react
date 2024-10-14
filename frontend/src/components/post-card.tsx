import RatingStars from './rating-stars'
import ClassModeBadge from './shared/class-mode-badge'
import SubjectsList from './subjects-list'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function PostCard ({ user }: { user: TeacherUser }) {
  return (
    <Card>
      <CardHeader>
        {user.avatar !== undefined && <img className='rounded-xl' src={user.avatar} alt={`Avatar of ${user.username}`} />}
        <div>
          <CardTitle>Card Title</CardTitle>
          <RatingStars rating={3.5} />
        </div>
      </CardHeader>
      <CardContent className='space-y-2'>
        {user.subjects !== undefined && <SubjectsList subjects={user.subjects}/>}
        {user.description !== undefined && <CardDescription>{user.description}</CardDescription>}
      </CardContent>
      <CardFooter className='flex justify-between'>
        <span className='font-bold text-xl'>$99/h</span>
        <ClassModeBadge classMode={user.classMode}/>
      </CardFooter>
    </Card>
  )
}
