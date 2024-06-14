import { useForm } from 'react-hook-form'
import { z } from 'zod'
import "./form.css"
import Painscale from './painscale'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'


const FormSchema = z.object({
  weightLoss: z.string({message:"Required"}).min(2).max(3),
  fever: z.string({message:"Required"}).min(2).max(3),
  cough: z.string({message:"Required"}).min(2).max(3),
  pain: z.string({message:"Required"}).min(1)
})

export default function Form() {

   const { register, reset, handleSubmit, formState: { errors } } = useForm<z.infer<typeof FormSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // Post data to server
    console.log(data)
    fetch('http://localhost:3000/painscale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    }).then((res) => {
        if (res.ok) {
          toast.success("Data submitted successfully", { icon: '👏' })
        } else {
          toast.error("Failed to submit data", { icon: '😢' })
        }
      }).catch((err) => {
        console.error(err)
        toast.error("Failed to submit data", { icon: '😢' })
      })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='radio-container'>
        <div>
          <p><strong>you experienced any of the following symptoms</strong></p>
          <p className='center'><strong>Yes</strong></p>
          <p className='center'><strong>No</strong></p>
        </div>
        <div>
          <div>
            <p>Unexplained weight loss for more than 3 weeks</p>
            {
              errors.weightLoss?.message && <p className='error'>{errors.weightLoss?.message}</p>
            }
          </div>
          <div>
            <input type='radio' {...register("weightLoss")} value='yes' />
          </div>
          <div>
            <input type='radio' {...register("weightLoss")} value='no' />
          </div>
        </div>
        <div>
          <div>
            <p>Fever for more than three days</p>
            {
              errors.fever?.message && <p className='error'>{errors.fever?.message}</p>
            }
          </div>
          <div>
            <input type='radio' {...register("fever")} value='yes' />
          </div>
          <div>
            <input type='radio' {...register("fever")} value='no' />
          </div>
        </div>
        <div>
          <div>
            <p>Productive cough for more than 3 weeks</p>
            {
              errors.cough?.message && <p className='error'>{errors.cough?.message}</p>
            }
          </div>
          <div>
            <input type='radio' {...register("cough")} value='yes' />
          </div>
          <div>
            <input type='radio' {...register("cough")} value='no' />
          </div>
        </div>
        <div>
          <div>
            <p>On a scale of 0-10, what is your pain level?</p>
            {
              errors.pain?.message && <p className='error'>{errors.pain?.message}</p>
            }
          </div>
          <Painscale error={errors.pain?.message} register={register} />
        </div>
      </div>
      <div className='button-container'>
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
}

