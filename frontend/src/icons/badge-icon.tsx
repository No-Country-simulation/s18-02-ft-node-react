export default function BadgeIcon ({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      width="27"
      height="27"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >

      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="3.5"
        stroke="#EDBF64"
      />

      <path
        d="M16 13.3333V16L18 18M22 16C22 16.7879 21.8448 17.5681 21.5433 18.2961C21.2417 19.0241 20.7998 19.6855 20.2426 20.2426C19.6855 20.7998 19.0241 21.2417 18.2961 21.5433C17.5681 21.8448 16.7879 22 16 22C15.2121 22 14.4319 21.8448 13.7039 21.5433C12.9759 21.2417 12.3145 20.7998 11.7574 20.2426C11.2002 19.6855 10.7583 19.0241 10.4567 18.2961C10.1552 17.5681 10 16.7879 10 16C10 14.4087 10.6321 12.8826 11.7574 11.7574C12.8826 10.6321 14.4087 10 16 10C17.5913 10 19.1174 10.6321 20.2426 11.7574C21.3679 12.8826 22 14.4087 22 16Z"
        stroke="#EDBF64"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
