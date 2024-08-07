import React from 'react'

export const Appbar = () => {
  return (
    <div className='flex justify-between border-y px-2 py-3'>
        <div>
            <h1 className='font-bold text-4xl '>Payments App</h1>
        </div>
        
        <div className='flex justify-center self-center items-center gap-3'>
            <h1>Hello,User</h1>
            <div className='bg-slate-200 rounded-full px-4 py-2 w-fit '>
                U
            </div>
        </div>
    </div>
  )
}
