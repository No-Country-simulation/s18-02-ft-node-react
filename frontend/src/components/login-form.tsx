'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type LoginSchema, loginSchema } from '@/lib/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import api from '@/lib/client/api'
import { useSessionStore } from '@/stores/session'
import { setTokenFromClient } from '@/lib/client'
import { useRouter } from 'next/navigation'

export default function LoginForm () {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const setSession = useSessionStore(store => store.setSession)
  const router = useRouter()

  const onSubmit = (values: LoginSchema) => {
    console.log(values)
    api.login(values).then(res => {
      setSession(res.payload)
      setTokenFromClient(res.token)
      router.push('/')
    }).catch(error => {
      console.log('error: ', error.response.data)
      form.setError('email', { message: error.response.data.payload })
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 w-full'
      >
        <div>
          <h1 className='font-bold text-lg'>Iniciar sesión</h1>
          <FormDescription>
            Bienvenido inicia sesion para utilizar la plataforma.
          </FormDescription>
        </div>

        <fieldset className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder='your-email@gmail.com' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder='your password' type='password' {...field} />
                </FormControl>
                <FormDescription>
                  <a href='#' className='underline hover:no-underline'>¿Olvidaste tu contraseña?</a>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <div className='space-y-4'>
          <Button
            className='w-full'
            type='submit'
          >Iniciar Sesión</Button>
          <Link
            href='/register'
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
          >Regístrate</Link>
        </div>
      </form>
    </Form>
  )
}
