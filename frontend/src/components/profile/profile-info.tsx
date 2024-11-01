export default function ProfileInfo ({ user }: { user: User }) {
  return (
    <section>
      <h2 className='font-bold text-sm mb-1'>Sobre mí</h2>
      <p className='text-muted-foreground'>{user.description}</p>
    </section>
  )
}
