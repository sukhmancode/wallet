import React from 'react'
import { Inputbox } from './Inputbox'
import { Users } from './Users'

export const UsersBar = () => {
  return (
    <div className='flex flex-col p-3'>
        <h1 className='font-bold'>Users</h1>
      
        <Users/>
    </div>
  )
}
