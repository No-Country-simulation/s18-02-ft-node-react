'use client'

import ClassCard from '@/components/class-card'
import CommentCard from '@/components/comment-card'
import { Faq } from '@/components/faq'
import SearchBar from '@/components/search-bar'
import Footer from '@/components/shared/footer'
import api from '@/lib/api'
import { COMMENTS, TEACHERS } from '@/lib/constants'
import { useEffect, useState } from 'react'

export default function Home () {
  const [loged, setLoged] = useState(false)

  useEffect(() => {
    api.current().then(res => {
      console.log(res)
      setLoged(true)
    }).catch(console.error)
  }, [])

  return loged
    ? (<>
      <main className="">
        {TEACHERS.map(teacher => <ClassCard key={teacher.id} user={teacher}/>)}
      </main>
    </>)
    : (<>
      <main>
        <section className='p-5'>
          <h1 className='text-3xl font-bold'>Todas tus clases particulares en un solo lugar.</h1>
          <img src="/images/class.png" alt="class image" />
        </section>

        <SearchBar />

        <section className='px-5 py-8 flex flex-col items-center gap-y-6'>
          <h2 className='text-2xl font-bold'>Como funciona</h2>
          <ul className='flex flex-col items-center gap-y-6'>
            <article>
              <div className='relative p-4 rounded-md max-w-[300px] bg-gray-300'>
                <img src='/images/student.png' alt='Student image' />
                <span className='absolute block bg-foreground text-background px-3 font-bolde text-3xl rounded-md bottom-0 right-1/2 translate-x-1/2 translate-y-1/2'>1</span>
              </div>
              <h3 className='text-xl font-semibold text-center mt-8'>Elige la materia</h3>
            </article>
            <article>
              <div className='relative p-4 rounded-md max-w-[300px] bg-gray-300'>
                <img src='/images/student.png' alt='Student image' />
                <span className='absolute block bg-foreground text-background px-3 font-bolde text-3xl rounded-md bottom-0 right-1/2 translate-x-1/2 translate-y-1/2'>2</span>
              </div>
              <h3 className='text-xl font-semibold text-center mt-8'>Busca tu profesor particular</h3>
            </article>
            <article>
              <div className='relative p-4 rounded-md max-w-[300px] bg-gray-300'>
                <img src='/images/student.png' alt='Student image' />
                <span className='absolute block bg-foreground text-background px-3 font-bolde text-3xl rounded-md bottom-0 right-1/2 translate-x-1/2 translate-y-1/2'>3</span>
              </div>
              <h3 className='text-xl font-semibold text-center mt-8'>Agenda una clase</h3>
            </article>
          </ul>
        </section>

        <section className='px-5 py-8 bg-secondary space-y-6'>
          <h2 className='font-bold text-2xl text-center'>Clases recomendadas</h2>
          <ol>
            {TEACHERS.map(teacher => <ClassCard key={teacher.id} user={teacher}/>)}
          </ol>
        </section>

        <section className='px-5 py-8 space-y-6'>
          <h2 className='text-2xl font-bold text-center'>Preguntas freguntas</h2>
          <Faq />
          <ol>
            {COMMENTS.map(comment => <CommentCard key={comment.id} comment={comment}/>)}
          </ol>
        </section>
      </main>
      <Footer />
    </>)
}
