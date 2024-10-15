import Logo from '@/components/logo'
import RegisterForm from '@/components/register-form'

export default function LoginPage () {
  return (
    <section className='max-w-md space-y-8 mx-auto pt-2'>
      <div>
        <Logo size={10} />
        <h1 className='font-bold text-xl mt-2'>Registra tu usuario</h1>
        <p className='text-sm text-muted-foreground'>Descripcion para la seccion del resgitro de usuario ya sea de tipo alumno o profesor.</p>
      </div>
      <RegisterForm />
    </section>
  )
}
