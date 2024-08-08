import React from 'react'

export const Button = ({label,onClick}) => {
  return (
    <div>
        <button onClick={onClick} className='bg-black-700 hover:bg-blue-950 text-white w-full p-2 rounded-md'>{label}</button>
    </div>
  )
}
