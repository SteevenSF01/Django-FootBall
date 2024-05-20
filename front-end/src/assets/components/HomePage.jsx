import { useState, useEffect } from "react"
import axios from 'axios'
import CardHomeJoueur from "./cardHomeJoueur/CardHomeJoueur"


export default function HomePage() {
    const [equipes, setEquipes] = useState([])

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const joueurs = await axios.get('http://127.0.0.1:8000/api/joueurs/')
                setJoueurs(joueurs.data)

                const equipes = await axios.get('http://127.0.0.1:8000/api/equipes/')
                setEquipes(equipes.data)
            }catch(error){
                console.error(error);
            }
        }
        fetchData()
    }, [])

    

    return (
        <>
            <section className="mt-10">
                <h1 className="text-white text-center text-4xl ">Les joueurs sans équipes</h1>
                <CardHomeJoueur />
            </section>
        </>
    )
}
