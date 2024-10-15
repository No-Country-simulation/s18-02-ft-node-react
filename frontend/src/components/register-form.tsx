'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tabs,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { type RegisterSchema, registerSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import api from '@/lib/api'

export default function RegisterForm () {
  const [userRole, setUserRole] = useState<User['role']>('student')
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      username: '',
      repeatedPassword: ''
    }
  })

  const onSubmit = (values: RegisterSchema) => {
    console.log(values, userRole)
    api.register({
      ...values,
      role: userRole
    }).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error)
      form.setError('email', { message: error.response.data.payload })
    })
  }

  return (
    <Form {...form}>
      <form
        className='space-y-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Tabs defaultValue="student" onValueChange={setUserRole as (v: string) => void}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Alumno</TabsTrigger>
            <TabsTrigger value="teacher">Profesor</TabsTrigger>
          </TabsList>
        </Tabs>
        <fieldset className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Nombre y apellido</FormLabel>
                <FormControl>
                  <Input placeholder='Nombre Completo' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input placeholder='my_username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder='my-email@gmail.com' type='email' {...field} />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='repeatedPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Repetir contraseña</FormLabel>
                <FormControl>
                  <Input placeholder='your repeated password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <Button
          className='w-full'
          type='submit'
        >Confirmar registro</Button>
      </form>
    </Form>
  )
}
