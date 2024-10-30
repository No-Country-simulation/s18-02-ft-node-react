export default function Page ({ params: { id } }: { params: { id: string } }) {
  console.log(id)
  // id es el id de la clase
  return (
    <p>Muestra mas detalles de la clase reservada que tienes ya ses alumno o maestro</p>
  )
}
