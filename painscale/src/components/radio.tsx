import React from 'react'

export default function Radio(props: {
  prompt: string
}) {

  return (
    <div>
      <div>
        <p>Unexplained weight loss for more than 3 weeks</p>
      </div>
      <div>
        <input type='radio' {...register("weightLoss")} value='yes' />
      </div>
      <div>
        <input type='radio' {...register("weightLoss")} value='no' />
      </div>
    </div>
  )
}

