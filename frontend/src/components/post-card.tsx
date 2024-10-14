import SubjectsList from './subjects-list'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function PostCard ({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        {user.avatar !== undefined && <img src={user.avatar} alt={`Avatar of ${user.username}`} />}
        <div>
          <CardTitle>Card Title</CardTitle>
          {/* rating */}
        </div>
      </CardHeader>
      <CardContent className='space-y-2'>
        {user.subjects !== undefined && <SubjectsList subjects={user.subjects}/>}
        {user.description !== undefined && <CardDescription>{user.description}</CardDescription>}
      </CardContent>
      <CardFooter className='flex justify-between'>
        <span className='font-bold text-xl'>$99/h</span>
        <Badge
          variant='outline'
          className='border-green-500 text-green-500'
        >MODO VIRTUAL</Badge>
      </CardFooter>
    </Card>
  )
}
