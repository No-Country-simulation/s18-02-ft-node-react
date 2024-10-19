import ClassModeBadge from '@/components/shared/class-mode-badge'
import RatingStars from '@/components/rating-stars'
import SubjectsList from '@/components/subjects-list'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import PencilIcon from '@/icons/pencil'
import { SESSION_USER, USERS } from '@/lib/constants'
import { getNameInitials } from '@/lib/utils'
import { cookies } from 'next/headers'
import UpdateProfileForm from '@/components/update-profile-form'

export default function ProfilePage ({ params: { username } }: { params: { username: string } }) {
  const cookieStore = cookies()
  console.log(username, cookieStore.get('token'))
  // fetch session user in the server with cookie
  const sessionUser = SESSION_USER
  const user = USERS.find(user => user.username === username)
  const isMyProfile = sessionUser.id === user?.id
  const isTeacher = user?.role === 'teacher'

  return user === undefined
    ? <>
    Usuario no encontrado: {username}
  </>
    : <>
    <section className='flex gap-x-6'>
      <div className='relative'>
        <Avatar className='size-[110px]'>
          <AvatarImage src={user.avatar} alt={`Avatar of ${user.username}`}/>
          <AvatarFallback
            className='w-full flex justify-center items-center text-3xl font-bold'
          >{getNameInitials(user.name)}</AvatarFallback>
        </Avatar>
        {isMyProfile && <button className='absolute right-0 bottom-0 bg-muted p-1 rounded-md'>
          <PencilIcon />
        </button>}
      </div>
      <div className='flex flex-col gap-y-2'>
        <h1 className='font-bold text-xl'>{user.name}</h1>
        <span className='text-neutral-500 text-sm'>@{user.username}</span>
        {user.role === 'teacher' && user.subjects !== undefined && <SubjectsList subjects={user.subjects}/>}
        {isTeacher && <RatingStars rating={3.2} />}
      </div>
    </section>
    {isTeacher && <section className='flex justify-between items-center'>
      <h2 className='text-3xl font-bold'>{user.classPrice === null ? '$10/h' : `$${user.classPrice}/h`}</h2>
      <ClassModeBadge classMode={user.classMode}/>
    </section>}
    <section>
      <h2 className='font-bold text-sm mb-1'>Sobre mí</h2>
      <p className='text-neutral-500'>{user.description}</p>
    </section>
    <UpdateProfileForm userProfile={user}/>
  </>
}
