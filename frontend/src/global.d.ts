interface Base {
  id: string
  createdAt: string
  updatedAt: string
}

declare interface StudentUser extends Base {
  name: string
  username: string
  email: string
  role: 'student'
  avatar?: string
  subjects?: string[]
  description?: string
  birthday: string | null
}

declare interface TeacherUser extends Base {
  name: string
  username: string
  email: string
  role: 'teacher'
  avatar?: string
  subjects?: string[]
  description?: string
  birthday: string | null
  classMode: 'remoto' | 'presencial'
  classPrice: number | null
}

declare type User = StudentUser | TeacherUser

declare interface Schedule extends Base {
  id: string
  teacherId: string
  startTime: string
  endTime: string
  isBooked?: boolean
}

declare interface AppClass extends Base {
  scheduleId: string
  teacherId: string
  studentId: string
  subject?: string
  isPaid?: boolean
  isComplete?: boolean
  status?: 'pending' | 'accepted'
  startTime: string
  endTime: string
}
