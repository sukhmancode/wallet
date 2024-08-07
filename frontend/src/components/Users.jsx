import React from 'react'
import { Button } from './Button'

export const Users = () => {
  return (
    <div className='flex justify-between my-5 mx-2'>
        <div>
            <div className='flex self-center gap-2 justify-center items-center  '>
               <div className='bg-slate-200 rounded-full px-4 py-2 w-fit'>S</div>
               <p>Sukhman</p>
            </div>
        </div>

        <div>
            <Button label={"Send Money"}></Button>
        </div>
    </div>
  )
}
