import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './assets/components/Navbar'
import { useState } from 'react'
import './App.css'

function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />
    }
  ])

  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App
