import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EquipeCard = () => {

    const [equipes, setequipes] = useState([])
    const [pays, setPays] = useState([])
    const [continents, setContinents] = useState([])
    useEffect(() => {
        const fetchData = async ()=> {
            try{
                const equipes = await axios.get('http://127.0.0.1:8000/api/equipes/')
                setequipes(equipes.data)

                const pays = await axios.get('http://127.0.0.1:8000/api/pays/')
                setPays(pays.data)

                const continent = await axios.get('http://127.0.0.1:8000/api/continents/')
                setContinents(continent.data)
                

            } catch(error){
                console.error(error);
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <h1 className="text-white text-5xl text-center mt-10">Les equipes</h1>
            <section className='flex flex-wrap justify-center gap-5 px-10 mt-10'>
                {equipes && equipes.map((equipe)=> {
                    return(
                        <div className="bg-gradient-to-tl from-white to bg-gray-400 rounded-lg shadow-md p-4 w-80" key={equipe.id}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">{equipe.nom}</h2>
                            <img src={`http://127.0.0.1:8000/${equipe.logo}`} alt="Equipe Logo" className="w-12 h-12 object-cover rounded-full" />
                        </div>
                        <div>
                        <p className="text-gray-600 mb-2">Continent: {continents.find((continent) => continent.id == equipe.continent) ? continents.find((continent) => continent.id == equipe.continent).nom : ''}</p>
                        <p className="text-gray-600 mb-2">Pays: {pays.find((p) => p.id == equipe.pays) ? pays.find((p) => p.id == equipe.pays).nom : ''}</p>
                            <p className="text-gray-600 mb-2">Max Joueurs: {equipe.maxJoueurs}</p>
                        </div>
                        <Link to={`/details/equipe/${equipe.id}`} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Voir les détails
                        </Link>
                    </div>
                    )
                })}
            </section>
        </>
    );
}

export default EquipeCard;
