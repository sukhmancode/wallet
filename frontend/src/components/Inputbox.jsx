import React from 'react'

export const Inputbox = ({placeholder,label,type}) => {
  return (
    <div>
        <label>{label}</label>
        <input className='rounded-md border-slate-200 w-full p-1 border' type={type} placeholder={placeholder} />
    </div>
  )
}
