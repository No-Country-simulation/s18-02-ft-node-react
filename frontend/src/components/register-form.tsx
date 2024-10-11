'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { type RegisterSchema, registerSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function RegisterForm () {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: RegisterSchema) => {
    console.log(values)
  }

  return (
    <Tabs defaultValue="student">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="student">Alumno</TabsTrigger>
        <TabsTrigger value="teacher">Profesor</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <Form {...form}>
          <form
            className='space-y-8'
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                    <FormDescription>
                      El nombre de usuario deve ser unico.
                    </FormDescription>
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
                    <FormDescription>
                      Tu contraseña deve de tene minimo 8 caracteres.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='repeatPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Repetir contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder='your rpeated password' type='password' {...field} />
                    </FormControl>
                    <FormDescription>
                      Ingresa de nuevo tu contraseña.
                    </FormDescription>
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
      </TabsContent>
      <TabsContent value="teacher">
        Profesor
      </TabsContent>
    </Tabs>
  )
}
