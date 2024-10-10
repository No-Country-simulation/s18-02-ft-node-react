interface Base {
  id: string
  createdAt: string
  updatedAt: string
}

declare interface User extends Base {
  name: string
  username: string
  email: string
  role: 'teacher' | 'student'
  avatar?: string
  subjects?: string[]
  description?: string
}

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
