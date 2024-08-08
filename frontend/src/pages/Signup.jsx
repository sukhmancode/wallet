import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { Subheading } from '../components/Subheading'
import { Inputbox } from '../components/Inputbox'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const SignUp = () => {
  const navigate = useNavigate()
  const [firstName,setfirstName] = useState("")
  const [lastName,setlastName] = useState("")
  const [username,setEmail] = useState("")
  const [password,setpassword] = useState("")


  return (
    <div className=' bg-blue-700 h-screen flex flex-col justify-center justify-items-center font-sans'>
        <div className='flex flex-col bg-white border-slate-200 rounded-md p-5 m-4 gap-4 border-2 w-80 h-120 justify-items-center justify-center self-center'>
          <Heading label={"Sign Up"}/>
          <Subheading label={"Enter your infromation to create an account"}></Subheading>
          <Inputbox
           onChange={(e) => setfirstName(e.target.value)}
            label={"first name"} 
            placeholder={"Enter first name (min 3 char)"}
            type={"text"}/>

          <Inputbox onChange={(e) => {
            setlastName(e.target.value)}}
            label={"last name"} 
            placeholder={"Enter last name (min 3 char)"}
            type={"text"}/>

          <Inputbox onChange={(e) => 
            setEmail(e.target.value)}
            label={"email address"} 
            placeholder={"Enter email address"} 
            type={"email"}/>

          <Inputbox onChange={(e) => setpassword(e.target.value)}
           label={"password"}
            placeholder={"Enter password "} 
            type={"password"}/>
          <div>
            <Button onClick={async () => {
           const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
              username,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token",response.data.token)
           navigate("/dashboard")
          }} label={"Sign Up"} >
            
            </Button>
          </div>
          <div class="py-1 text-sm flex justify-center"><div>Already have an account?</div><Link to={"/signin"}> Sign in</Link></div>
        </div>
  </div>
  )
}
