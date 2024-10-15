import LoginForm from '@/components/login-form'
import Logo from '@/components/logo'

export default function LoginPage () {
  return (
    <section className='max-w-sm mx-auto flex flex-col gap-y-16 items-center pt-8'>
      <Logo />
      <LoginForm />
    </section>
  )
}
