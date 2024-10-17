import SearchIcon from '@/icons/search'
import { Button } from './ui/button'
import { Input } from './ui/input'
import AdjustmentsIcon from '@/icons/adjustments'

export default function SearchBar () {
  return (
    <form
      className='bg-border flex gap-x-2 px-5 py-8'
      onSubmit={e => {
        e.preventDefault()
        console.log('search')
      }}
    >
      <Input type='search' placeholder='Buscar' />
      <Button size='icon' className='p-3'>
        <SearchIcon />
      </Button>
      <Button size='icon' variant='outline' className='p-3 bg-transparent'>
        <AdjustmentsIcon />
      </Button>
    </form>
  )
}
