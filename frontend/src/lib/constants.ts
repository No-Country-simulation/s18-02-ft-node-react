import { type TeacherClass } from '@/types'

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:2004/api/'

export const TEACHERS: TeacherUser[] = [
  {
    id: 'asd0-hola-23',
    name: 'Maria Sosa',
    email: 'mariaSosa@gmail.com',
    username: 'MarS',
    role: 'teacher',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    subjects: ['Matrmática', 'Química', 'Física'],
    description: 'Descripcion del profesor que tiene muchas materias. Para mostrar en la tarjeta',
    createdAt: '2024-10-12T23:12:40.843Z',
    updatedAt: '2024-10-12T23:12:40.843Z',
    birthday: null,
    classMode: 'remoto',
    classPrice: null
  },
  {
    id: 'asd0-hjose3ola-23',
    name: 'Jose Martin Moles',
    email: 'mariaSosa@gmail.com',
    username: 'jose2',
    role: 'teacher',
    avatar: 'https://randomuser.me/api/portraits/men/69.jpg',
    subjects: ['Química'],
    description: 'Descripcion del profesor que tiene muchas materias. Para mostrar en la tarjeta',
    createdAt: '2024-10-16T23:08:09.684Z',
    updatedAt: '2024-10-16T23:08:09.684Z',
    birthday: null,
    classMode: 'presencial',
    classPrice: null
  }
]

export const USERS: User[] = [
  {
    id: 'asd0-23',
    name: 'David Garcia',
    email: 'gacub20ru@gmail.com',
    username: 'dagamdev',
    role: 'student',
    createdAt: '024-10-12T23:19:48.843Z',
    updatedAt: '024-10-12T23:19:48.843Z',
    birthday: null
  },
  ...TEACHERS
]

export const SESSION_USER: SessionUser = {
  id: 'asd0-23',
  name: 'David Garcia',
  avatar: 'gacub20ru@gmail.com',
  username: 'dagamdev'
}

export const COMMENTS = [
  {
    id: 'asd0-hol5a-23',
    user: USERS[1],
    content: '"People are so scared to lose that they don\'t even try. Like, one thing people can\'t say is that I\'m not trying, and I\'m not trying my hardest, and I\'m not trying to do the best way I know how."',
    rating: 4
  },
  {
    id: 'asd-jojo-a-23',
    user: USERS[0],
    content: 'Hola este es el contenido del comentario. Holdksodfw er sfdkn l-32.',
    rating: 2
  }
]

export const NEXT_CLASSES: TeacherClass[] = [
  {
    id: '23-23-23-sd',
    user: TEACHERS[0],
    subject: 'Matematica'
  },
  {
    id: '23-lk-23-sd',
    user: TEACHERS[1],
    subject: 'Quimica'
  }
]
