import { Badge } from './ui/badge'

export default function SubjectsList ({ subjects }: { subjects: string[] }) {
  return (
    <ul
      className='flex gap-2'
    >
      {subjects.map(subject => <Badge
        key={subject}
        variant='outline'
        className='rounded-md'
      >{subject.toUpperCase()}</Badge>)}
    </ul>
  )
}
