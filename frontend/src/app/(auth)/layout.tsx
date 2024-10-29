export default function AuthLayout ({ children }: { children: React.ReactNode }) {
  return (
    <main className='p-5 min-h-screen flex'>
      {children}
    </main>
  )
}
