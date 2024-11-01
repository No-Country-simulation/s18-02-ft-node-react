import { getNameInitials } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card, CardContent, CardDescription, CardFooter } from './ui/card'
import RatingStars from './rating-stars'

export default function CommentCard ({ comment }: { comment: {
  id: string
  user: User
  content: string
  rating: number
} }) {
  return (
    <Card className='bg-secondary px-5 py-8 max-w-sm h-full'>
      <CardDescription className='text-md text-center text-pretty text-foreground'>
        {comment.content}
      </CardDescription>
      <CardContent className='flex flex-col gap-y-4 items-center mt-4'>
        <Avatar className='size-12'>
          <AvatarImage src={comment.user.avatar} alt={`Avatar of ${comment.user.username}`} />
          <AvatarFallback className='w-full flex justify-center items-center bg-background'>{getNameInitials(comment.user.name)}</AvatarFallback>
        </Avatar>
        <span>{comment.user.name}</span>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <RatingStars rating={comment.rating} />
      </CardFooter>
    </Card>
  )
}
