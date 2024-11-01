export default function SearchIcon ({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='m14 14-4-4m1.333-3.333a4.667 4.667 0 1 1-9.334 0 4.667 4.667 0 0 1 9.334 0Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
