'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type UpdateProfileSchema, updateStudentSchema, updateTeacherSchema } from '@/lib/zod'
import { Input } from '../ui/input'
import DatePicker from '../date-picker'
import { Button, buttonVariants } from '../ui/button'
import { Textarea } from '../ui/textarea'
import api from '@/lib/client/api'
import ClassModeSelector from './class-mode-selector'
import SubjectsSelector from './subjects-selector'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function UpdateProfileForm ({ user }: { user: User }) {
  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(user.role === 'student' ? updateStudentSchema : updateTeacherSchema),
    defaultValues: {
      name: user.name,
      birthday: user.birthday,
      description: user.description,
      ...(user.role === 'teacher'
        ? {
            classMode: user.classMode,
            subjects: user.subjects,
            classPrice: (user.classPrice ?? '').toString()
          }
        : {}
      )
    }
  })

  const onSubmit = async (values: UpdateProfileSchema) => {
    console.log(values)
    try {
      await api.updateProfile({ ...values, username: user.username })
      console.log('Perfil actualizado')
    } catch (error) {
      console.log('Error al actualizar el perfil: ', error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 w-full'
      >
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sobre mí</FormLabel>
              <FormControl>
                <Textarea
                  className='resize-none'
                  placeholder='quién eres?'
                  maxLength={300}
                  {...field}
                />
              </FormControl>
              <FormDescription>Máximo 300 caracteres</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <fieldset className='grid gap-y-2'>
          <h2 className='pb-4 text-xl font-bold'>Datos personales</h2>

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre y apellido</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Fecha de nacimiento</FormLabel>
            <FormControl>
              <DatePicker
                defaultValue={user.birthday ?? undefined}
                onChange={(date) => {
                  form.setValue('birthday', date ?? null)
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input disabled value={user.email} type='email' />
            </FormControl>
          </FormItem>

          {user.role === 'teacher' && <>
            <FormItem>
              <FormLabel>Modalidad de clase</FormLabel>
              <FormControl>
                <ClassModeSelector
                  defaultValue={user.classMode}
                  onChangeValue={value => {
                    form.setValue('classMode', value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Materias que enseñas</FormLabel>
              <FormControl>
                <SubjectsSelector
                  defaultValue={user.subjects}
                  onChangeValue={value => {
                    form.setValue('subjects', value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormField
              control={form.control}
              name='classPrice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio de la clase</FormLabel>
                  <FormControl>
                    <Input placeholder='199' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>}
        </fieldset>

        {user.role === 'teacher' && <Link href={`/profile/${user.username}/availability`} className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}>Configurar horarios del mes</Link>}

        <div className='flex gap-x-4'>
          <Button
            className='w-full'
            variant='outline'
          >Editar</Button>
          <Button
            className='w-full'
            type='submit'
          >Confirmar</Button>
        </div>
      </form>
    </Form>
  )
}
