import React from 'react'
import { Heading } from '../components/Heading'
import { Inputbox } from '../components/Inputbox'
import { Button } from '../components/Button'

export const SendMoney = () => {
  return (
    <div className=' h-screen flex flex-col justify-center justify-items-center font-sans'>
        <div className='flex flex-col bg-white border-slate-200 rounded-md p-5 m-4 gap-4 border-2 w-80 h-120 justify-items-center justify-center self-center '>
            <Heading label={"Send Money"}/>
            <div className='flex gap-2 items-center '>
                <div className='bg-green-500 rounded-full px-3 py-1 font-semibold text-2xl '>A</div>
                <h1>Friend's Name</h1>
            </div>
            <label >Amount in Rs</label>
            <Inputbox type={"number"} placeholder={"Enter amount"}/>
            <Button label={"Initiate Transfer"}></Button>
        </div>
    </div>
  )
}
