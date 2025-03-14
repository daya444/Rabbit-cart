import React from 'react'
import { Header } from '../common/header'
import { Footer } from '../common/footer'
import { Home } from '../pages/home'
import { Outlet } from 'react-router-dom'


export const UserLayout = () => {
  return (
  <>
    <Header/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
   

   
   </>
  )
}

