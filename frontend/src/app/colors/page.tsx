'use client'

import config from '../../../tailwind.config'

export default function ColorsPage () {
  const colors = config.theme?.extend?.colors
  console.log(colors)

  return (
    <main className='p-5 flex gap-4 flex-wrap'>
      {colors !== undefined && Object.entries(colors).map(([key, value]) => {
        if (typeof value === 'object') {
          return (<section
            key={key}
          >
            {Object.entries(value).map(([ckey, cvalue]) => <ColorCard
              key={ckey}
              color={{ key: ckey, value: cvalue as string }}
              parentColor={{ key, value }}
            />)}
          </section>)
        }

        return <ColorCard key={key} color={{ key, value }}/>
      })}
    </main>
  )
}

function ColorCard ({ color, parentColor }: {
  color: {
    key: string
    value: string
  }
  parentColor?: {
    key: string
    value: string
  }
}) {
  const colorName = parentColor === undefined ? color.key : `${parentColor.key}-${color.key}`

  return (
    <article
      className=''
    >
      <span>{colorName}</span>
      <div
        className='size-32 rounded-lg border'
        style={{ backgroundColor: color.value }}
      ></div>
    </article>
  )
}
