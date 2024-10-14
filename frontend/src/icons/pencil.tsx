export default function PencilIcon ({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793Zm-2.207 2.207L3 14.172V17h2.828l8.38-8.379-2.83-2.828h.001Z'
        fill='currentColor'
      />
    </svg>
  )
}
