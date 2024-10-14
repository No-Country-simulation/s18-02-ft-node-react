export const API_URL = process.env.API_URL ?? 'http://localhost:2004/api/'

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
    createdAt: '024-10-12T23:12:40.843Z',
    updatedAt: '024-10-12T23:12:40.843Z',
    birthday: null,
    classMode: 'remoto',
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

export const SESSION_USER = USERS[0]
