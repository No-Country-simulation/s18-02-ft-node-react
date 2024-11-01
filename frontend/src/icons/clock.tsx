export default function ClockIcon ({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      width='16'
      height='17'
      viewBox='0 0 16 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 14.9A6.4 6.4 0 1 0 8 2.1a6.4 6.4 0 0 0 0 12.8Zm.8-9.6a.8.8 0 0 0-1.6 0v3.2a.8.8 0 0 0 .234.566l2.263 2.263a.8.8 0 0 0 1.132-1.132L8.8 8.169V5.3Z'
        fill='currentColor'
      />
    </svg>
  )
}
