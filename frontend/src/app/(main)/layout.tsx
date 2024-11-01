import Header from '@/components/shared/header'
import Navbar from '@/components/shared/navbar'

export default function MainLayout ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Navbar />
    </>
  )
}
