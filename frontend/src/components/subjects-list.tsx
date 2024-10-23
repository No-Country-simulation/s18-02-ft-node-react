import { Badge } from './ui/badge'

export default function SubjectsList ({ subjects }: { subjects: string[] }) {
  return (
    <ul
      className='flex gap-2 flex-wrap'
    >
      {subjects.map(subject => <Badge
        key={subject}
        variant='outline'
        className='rounded-sm py-1'
      >{subject.toUpperCase()}</Badge>)}
    </ul>
  )
}
