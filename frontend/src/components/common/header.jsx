import React from 'react'
import { Topbar } from '../layout/topbar'
import { Navbar } from './navbar'


export const Header = () => {
  return (
    <header className='border-b border-gray-200 pb-2'>
       <Topbar/>
        <Navbar/>
       
        

    </header>
  )
}

