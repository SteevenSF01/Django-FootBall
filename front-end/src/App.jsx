import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './assets/components/Navbar'
import HomePage from './assets/components/HomePage'
import Settings from './assets/components/Settings'
import './App.css'

function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children : [
        {
          path :'/',
          element: <HomePage /> ,
          index: true
        },
        {
          path :'/settings',
          element: <Settings /> ,
        },
      ]
    }
  ])

  return (
    <>
      <section className='bg-gradient-to-b from-[#020511] to-[#0d1821] '>
        <RouterProvider router={route} />
      </section>
    </>
  )
}

export default App
