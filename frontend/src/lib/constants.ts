import { type TeacherClass } from '@/types'

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:2004/api/'

export const TEACHERS: TeacherUser[] = [
  {
    id: '67226796b8b5e122f49d21db',
    name: 'Sta. Andrea Cortéz Ríos',
    username: 'sta..andrea583',
    email: 'MariadelosAngeles.ArevaloArmenta@yahoo.com',
    role: 'teacher',
    avatar: 'https://avatars.githubusercontent.com/u/48159567',
    subjects: ['Filosofía', 'Psicología'],
    description: 'Soy un profesor apasionado por la educación, con más de 10 años de exp…',
    birthday: '1988-12-07T05:47:22.618+00:00',
    classPrice: 10065,
    classMode: 'remoto',
    schedulePreferences: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
      id: '671a9160bc6d8asd5aadd848'
    },
    createdAt: '2024-10-30T17:06:30.696+00:00',
    updatedAt: '2024-10-30T17:06:30.696+00:00'
  },
  {
    id: '67226796b8b5e122f49d21de',
    name: 'Miguel Salcido Farías',
    username: 'miguel.salcido820',
    email: 'Alberto_FariasAlcala9@gmail.com',
    role: 'teacher',
    avatar: 'https://avatars.githubusercontent.com/u/83872662',
    subjects: ['Geografía', 'Psicología'],
    description: 'Soy un profesor apasionado por la educación, con más de 10 años de exp…',
    birthday: '1971-08-13T13:00:54.533+00:00',
    classPrice: 6059,
    classMode: 'remoto',
    schedulePreferences: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
      id: '67160bc6d8asd5aadd848'
    },
    createdAt: '2024-10-30T17:06:30.697+00:00',
    updatedAt: '2024-10-30T17:06:30.697+00:00'
  },
  {
    id: '67226796b8b5e122f49d21e1',
    name: 'Daniel Iglesias Galván',
    username: 'daniel.iglesias902',
    email: 'Rosario_FierroGamboa61@gmail.com',
    role: 'teacher',
    avatar: 'https://avatars.githubusercontent.com/u/82117502',
    subjects: ['Química'],
    description: 'Soy un profesor apasionado por la educación, con más de 10 años de exp…',
    birthday: '1993-04-13T01:15:39.593+00:00',
    classPrice: 6120,
    classMode: 'remoto',
    schedulePreferences: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
      id: '6716d8asd5aadd848'
    },
    createdAt: '2024-10-30T17:06:30.697+00:00',
    updatedAt: '2024-10-30T17:06:30.697+00:00'
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
  username: 'dagamdev',
  role: 'student'
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
