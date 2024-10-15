interface Base {
  id: string
  createdAt: string
  updatedAt: string
}

interface BaseUser extends Base {
  name: string
  username: string
  email: string
  role: 'student' | 'teacher'
  avatar?: string
  birthday: string | null
  description?: string
}

declare interface StudentUser extends BaseUser {
  role: 'student'
}

declare interface TeacherUser extends BaseUser {
  role: 'teacher'
  subjects?: string[]
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
