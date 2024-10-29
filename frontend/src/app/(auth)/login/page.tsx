import LoginForm from '@/components/login-form'
import LogoIcon from '@/icons/logo'
import TeachAppIcon from '@/icons/teach-app'

export default function LoginPage () {
  return (
    <section className='max-w-sm mx-auto flex flex-col gap-y-16 items-center pt-8'>
      <div>
        <LogoIcon className='size-12 mb-4 mx-auto' />
        <TeachAppIcon className='w-auto h-8'/>
      </div>
      <LoginForm />
    </section>
  )
}
