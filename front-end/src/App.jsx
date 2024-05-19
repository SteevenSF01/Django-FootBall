import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './assets/components/Navbar'
import Joueurs from './assets/components/Joueurs'
import './App.css'

function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children : [
        {
          path :'/',
          element: <Joueurs /> ,
          index: true
        }
      ]
    }
  ])

  return (
    <>
      <section className='bg-gray-100'>
        <RouterProvider router={route} />
      </section>
    </>
  )
}

export default App
