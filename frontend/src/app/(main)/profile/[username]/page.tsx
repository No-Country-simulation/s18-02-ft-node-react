import ClassModeBadge from '@/components/shared/class-mode-badge'
import SubjectsList from '@/components/subjects-list'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import PencilIcon from '@/icons/pencil'
import { getNameInitials } from '@/lib/utils'
import UpdateProfileForm from '@/components/profile/update-profile-form'
import ProfileInfo from '@/components/profile/profile-info'
import api from '@/lib/server/api'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import RatingStars from '@/components/rating-stars'

export default async function ProfilePage ({ params: { username } }: { params: { username: string } }) {
  console.log(username)
  const currentRes = await api.current()
  const sessionUser = currentRes.payload
  console.log('Session user: ', sessionUser)

  const userRes = await (username === sessionUser.username ? api.getMyProfile() : api.getProfile(username))
  console.log('profile: ', userRes)

  if (userRes.status !== 'success') {
    notFound()
  }
  const user = userRes.payload

  const isMyProfile = user.id === sessionUser.id
  const isTeacher = user.role === 'teacher'

  console.log(user)

  return (
    <main className='flex-1 py-6 px-5 space-y-6'>
      <section className='flex gap-x-6 items-start'>
        <div className='relative flex'>
          <Avatar className='size-[110px]'>
            <AvatarImage src={user.avatar} alt={`Avatar of ${user.username}`}/>
            <AvatarFallback
              className='w-full flex justify-center items-center text-3xl font-bold'
            >{getNameInitials(user.name)}</AvatarFallback>
          </Avatar>
          {isMyProfile && <button className='absolute right-0 bottom-0 bg-secondary p-1 rounded-md'>
            <PencilIcon />
          </button>}
        </div>
        <div className='space-y-2'>
          <div>
            <h1 className='font-bold text-xl'>{user.name}</h1>
            <span className='block text-muted-foreground text-sm mb-2'>@{user.username}</span>
          </div>
          {isTeacher && user.subjects !== undefined && <SubjectsList subjects={user.subjects}/>}
          {isTeacher && <RatingStars rating={3.2} />}
        </div>
      </section>

      {isTeacher && <section className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>{user.classPrice === null ? '$10/h' : `$${user.classPrice}/h`}</h2>
        <ClassModeBadge classMode={user.classMode}/>
      </section>}

      {isMyProfile ? <UpdateProfileForm user={user}/> : <ProfileInfo user={user} />}

      {(user.role === 'teacher' && sessionUser.id !== user.id) && <section
        className='flex gap-x-4'
      >
        <Button
          variant='outline'
          className='w-full'
        >Añadir a Mis profesores</Button>
        <Button className='w-full'>Reserva una clase</Button>
      </section>}
    </main>
  )
}
