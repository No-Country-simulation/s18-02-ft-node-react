'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type UpdateProfileSchema, updateStudentSchema, updateTeacherSchema } from '@/lib/zod'
import { Input } from '../ui/input'
import DatePicker from '../date-picker'
import { Button } from '../ui/button'

export default function UpdateProfileForm ({ user }: { user: User }) {
  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(user.role === 'student' ? updateStudentSchema : updateTeacherSchema),
    defaultValues: {
      name: '',
      description: '',
      ...(user.role === 'student'
        ? {}
        : {
            classMode: 'remoto',
            classPrice: null,
            subjects: []
          })
    }
  })

  const onSubmit = (values: UpdateProfileSchema) => {
    console.log(values)
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
            name='name'
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
          <FormField disabled
            name='email'
            render={() => (
              <FormItem>
                <FormLabel className='font-semibold'>Email</FormLabel>
                <FormControl>
                  <Input placeholder={user.email} type='email' />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='birthday'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Fecha de nacimiento</FormLabel>
                <FormControl>
                  <DatePicker />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <div className='flex gap-x-4'>
          <Button
            className='w-full'
            variant='outline'
          >Editar</Button>
          <Button
            className='w-full'
          >Confirmar</Button>
        </div>
      </form>
    </Form>
  )
}
