const links = [
  'Company',
  'About Us',
  'Freebied',
  'Premium Tools',
  'Blog'
]

export default function Footer () {
  return (
    <footer className='bg-neutral-900 text-neutral-300 py-12 flex flex-col items-center gap-y-12'>
      <ul>
        {links.map(link => <li key={link} className='text-center'>{link}</li>)}
      </ul>
      {/* Iconos de redes sociales */}
      <section>
        <span>All rights reserved.</span>
        <p>Copyright &copy; 2024</p>
      </section>
    </footer>
  )
}
