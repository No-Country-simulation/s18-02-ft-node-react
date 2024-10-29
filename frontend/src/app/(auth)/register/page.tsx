import RegisterForm from '@/components/register-form'
import LogoIcon from '@/icons/logo'
import TeachAppIcon from '@/icons/teach-app'

export default function LoginPage () {
  return (
    <section className='max-w-md flex flex-col gap-y-8 mx-auto pt-2 w-full'>
      <div className='flex gap-x-3 items-center'>
        <LogoIcon className='size-8'/>
        <TeachAppIcon className='w-auto h-6'/>
      </div>
      <div>
        <h1 className='font-bold text-xl mt-2'>Registra tu usuario</h1>
        <p className='text-sm text-muted-foreground'>Ingresa tus datos de registro.</p>
      </div>
      <RegisterForm />
    </section>
  )
}
