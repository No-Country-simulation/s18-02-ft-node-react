'use client'

import ClassModeBadge from '@/components/shared/class-mode-badge'
import SubjectsList from '@/components/subjects-list'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import PencilIcon from '@/icons/pencil'
import { USERS } from '@/lib/constants'
import { getNameInitials } from '@/lib/utils'
import UpdateProfileForm from '@/components/update-profile-form'
import { notFound, useRouter } from 'next/navigation'
import { useSessionStore } from '@/stores/session'
import ProfileInfo from '@/components/profile/profile-info'

export default function ProfilePage ({ params: { username } }: { params: { username: string } }) {
  // const cookieStore = cookies()
  // console.log(username, cookieStore.get('token'))
  // fetch session user in the server with cookie
  const sessionUser = useSessionStore(store => store.user)
  const user = USERS.find(user => user.username === username)
  const router = useRouter()

  if (sessionUser === undefined) {
    router.push('/login')
    return null
  }

  const isMyProfile = sessionUser.id === user?.id
  const isTeacher = user?.role === 'teacher'

  if (user === undefined) {
    notFound()
  }

  return (
    <>
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
        <div className=''>
          <h1 className='font-bold text-xl'>{user.name}</h1>
          <span className='block text-muted-foreground text-sm mb-2'>@{user.username}</span>
          {user.role === 'teacher' && user.subjects !== undefined && <SubjectsList subjects={user.subjects}/>}
          {/* {isTeacher && <RatingStars rating={3.2} />} */}
        </div>
      </section>

      {isTeacher && <section className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>{user.classPrice === null ? '$10/h' : `$${user.classPrice}/h`}</h2>
        <ClassModeBadge classMode={user.classMode}/>
      </section>}

      {isMyProfile ? <UpdateProfileForm user={user}/> : <ProfileInfo user={user} />}
    </>
  )
}
