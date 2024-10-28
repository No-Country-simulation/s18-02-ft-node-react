export default function CheckCircleIcon ({ ...props }: React.ComponentProps<'svg'>) {
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
        d='m6 8 1.333 1.333L10 6.667M14 8A6 6 0 1 1 1.999 8 6 6 0 0 1 14 8Z'
        stroke='currentColor'
        strokeWidth='1.333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
