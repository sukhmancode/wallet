import React from 'react'
import { Heading } from '../components/Heading'
import { Subheading } from '../components/Subheading'
import { Inputbox } from '../components/Inputbox'
import { Button } from '../components/Button'

export const SignIn = () => {
  return (
    <div className=' bg-blue-700 h-screen flex flex-col justify-center justify-items-center font-sans'>
        <div className='flex flex-col bg-white border-slate-200 rounded-md p-5 m-4 gap-4 border-2 w-80 h-120 justify-items-center justify-center self-center'>
          <Heading label={"Sign In"}/>
          <Subheading label={"Enter your infromation to sign your account"}></Subheading>
          <Inputbox label={"email address"} placeholder={"Enter email address"} type={"email"}/>
          <Inputbox label={"password "} placeholder={"Enter password "} type={"password"}/>
          <div>
            <Button label={"Sign In"}>

            </Button>
          </div>
          <div class="py-1 text-sm flex justify-center"><div>Create an account?</div> Sign in</div>
        </div>
  </div>
  )
}