import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './assets/components/Navbar'
import Settings from './assets/components/Settings'
import HomePage from './assets/components/HomePage'
// Joueurs
import JoueursSettings from './assets/components/JoueursSettings'
import JoueurModifier from './assets/components/JoueurModifier'
import Joueurs from './assets/components/Joueurs'
import JoueurDetails from './assets/components/DetailsJoueur'
// Equipes
import EquipesSettings from './assets/components/EquipesSettings'
import EquipeModifier from './assets/components/EquipeModifier'
import EquipeCard from './assets/components/EquipeCard'
import EquipeDetails from './assets/components/EquipeDetails'
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
          path :'/lesjoueurs',
          element: <Joueurs /> ,
        },
        {
          path :'/lesequipes',
          element: <EquipeCard /> ,
        },
        {
          path :'/settings',
          element: <Settings /> ,
        },
        {
          path :'/settings/equipe',
          element: <EquipesSettings /> ,
        },
        {
          path :'/settings/equipe/:id',
          element: <EquipeModifier /> ,
        },
        {
          path :'/details/equipe/:id',
          element: <EquipeDetails /> ,
        },
        {
          path :'/settings/joueur',
          element: <JoueursSettings /> ,
        },
        {
          path :'/settings/joueur/:id',
          element: <JoueurModifier /> ,
        },
        {
          path :'/details/joueur/:id',
          element: <JoueurDetails /> ,
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
