import React, { useEffect, useState } from 'react'
import { Button } from './Button'
import axios from 'axios'
import { Inputbox } from './Inputbox'
import { useNavigate } from 'react-router-dom'

export const Users = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
      .then(response => {
        setUsers(response.data.users)
      })
      .catch(error => {
        console.error("There was an error fetching the users! ", error);
      });
  }, [filter]); 

  return (
    <div className='flex justify-between my-5 mx-2 flex-col gap-5'>
        <Inputbox onChange={(e) => {
          setFilter(e.target.value)
        }} type={"text"} placeholder={"Search Users"}/>
      <div className='flex justify-between flex-col w-full gap-3'>
        {users.map((user) => (
          <div key={user._id} className='flex gap-2 justify-between'>
            <div className='bg-slate-200 rounded-full px-4 py-2 w-fit'>
              {user.firstName[0].toUpperCase()}
            </div>
            <div className='flex justify-between w-full'>
            <div>
              {user.firstName} {user.lastName}
            </div>
              <div>
            <Button onClick={() => {
              navigate(`/send?id=${user._id}&name=${user.firstName}`)
            }} label={"Send Money"} />
            </div>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  )
}
