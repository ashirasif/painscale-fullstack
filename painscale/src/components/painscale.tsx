import { UseFormRegister } from 'react-hook-form'
import { FormSchema } from './form'
import { z } from 'zod'
import "./painscale.css"
import Emojies from './emojies'

export default function Painscale(props: {
  register: UseFormRegister<z.infer<typeof FormSchema>>,
  error?: string
}) {

  const text = {
    0: {
      content: 'No pain',
      columnStart: 1,
      columnEnd: 2
    },
    1: {
      content: 'Mild',
      columnStart: 2,
      columnEnd: 4
    },
    2: {
      content: 'Moderate',
      columnStart: 5,
      columnEnd: 7
    },
    3: {
      content: 'Severe',
      columnStart: 8,
      columnEnd: 10,
    },
    4: {
      content: 'Very severe',
      columnStart: 10,
      columnEnd: 10
    },
  }

  return (
    <div className='painscale-container'>

      <div className='emojies-container'>
        <Emojies />
      </div>

      <div className='colored-lines-container'>
        <div className="colored-line" style={{borderColor:"#22c55e", gridColumnStart: 2, gridColumnEnd: 4}}></div>
        <div className="colored-line" style={{borderColor:"#facc15", gridColumnStart: 5, gridColumnEnd: 7}}></div>
        <div className="colored-line" style={{borderColor:"#b91c1c", gridColumnStart: 8, gridColumnEnd: 10}}></div>
      </div>

      <div className='text-container'>
        {
          Object.entries(text).map(([key, value]) => (
            <div key={key} style={{gridColumnStart: value.columnStart, gridColumnEnd: value.columnEnd}}>
              {value.content}
            </div>
          ))
        }
      </div>

      <div className='vert-lines-container'>
        <div className='hori-line'></div>
        {Array.from({length: 11}).map((_, e) => (
          <div key={e} className='vert-line'></div>
        ))}
      </div>
      
      <div className='painscale-radio-container'>
        {Array.from({length: 11}).map((_, e) => (
          <div key={e} className='line-radio-container'>
            <div className='painscale-radio'>
              <label>
                <input
                  {...props.register('pain')}
                  type="radio"
                  value={e}
                />
                {e}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

