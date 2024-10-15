export default function PencilAltIcon ({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      width='20'
      height='21'
      viewBox='0 0 20 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17.414 3.086a2 2 0 0 0-2.828 0L7 10.672V13.5h2.828l7.586-7.586a2 2 0 0 0 0-2.828Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2 6.5a2 2 0 0 1 2-2h4a1 1 0 0 1 0 2H4v10h10v-4a1 1 0 0 1 2 0v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-10Z'
        fill='currentColor'
      />
    </svg>
  )
}
