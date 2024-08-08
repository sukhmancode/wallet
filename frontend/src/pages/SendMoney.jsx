import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { Inputbox } from '../components/Inputbox'
import { Button } from '../components/Button'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
export const SendMoney = () => {


  const [amount,setAmount] = useState(0)
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const name = searchParams.get("name")
  return (
    <div className=' h-screen flex flex-col justify-center justify-items-center font-sans'>
        <div className='flex flex-col bg-white border-slate-200 rounded-md p-5 m-4 gap-4 border-2 w-80 h-120 justify-items-center justify-center self-center '>
            <Heading label={"Send Money"}/>
            <div className='flex gap-2 items-center '>
                <div className='bg-green-500 rounded-full px-3 py-1 font-semibold text-2xl '>{name[0].toUpperCase()}</div>
                <h1>{name}</h1>
            </div>
            <label >Amount in Rs</label>
            <Inputbox onChange={(e) =>{setAmount(e.target.value)}} type={"number"} placeholder={"Enter amount"}/>
            <Button onClick={async() => {
             await axios.post("http://localhost:3000/api/v1/account/transfer" ,{
                to:id,
                amount
              }, {
                headers:{
                  Authorization:"Bearer "+ localStorage.getItem("token")
                }
              })
            }} label={"Initiate Transfer"}></Button>
        </div>
    </div>
  )
}
