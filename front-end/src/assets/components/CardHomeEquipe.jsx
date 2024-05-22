import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import AOS from 'aos'
import './../../../node_modules/aos/dist/aos.css'
import { Link } from 'react-router-dom';

export default function CardHomeEquipe() {

    useEffect(() => {
        AOS.init({duration : 2000})
    }, [])

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
            <section className='flex flex-wrap justify-center gap-5 px-10 pb-10 mt-10' data-aos=''>
                {equipes && equipes.map((equipe)=> {
                    if (equipe.joueurs.length > 5) {
                        return(
                            <div className="bg-gradient-to-tl from-white to bg-gray-400 rounded-lg shadow-md p-4 w-80" key={equipe.id}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">{equipe.nom}</h2>
                                <img src={`http://127.0.0.1:8000/${equipe.logo}`} alt="Equipe Logo" className="w-12 h-12 object-cover rounded-full" />
                            </div>
                            <div>
                            <p className="text-gray-800 mb-2"> <span className='font-semibold text-lg'>Continent:</span> {continents.find((continent) => continent.id == equipe.continent) ? continents.find((continent) => continent.id == equipe.continent).nom : ''}</p>
                            <p className="text-gray-800 mb-5"><span className='text-lg font-semibold'>Pays:</span> {pays.find((p) => p.id == equipe.pays) ? pays.find((p) => p.id == equipe.pays).nom : ''}</p>
                            </div>
                            <Link to={`/details/equipe/${equipe.id}`} >
                            <button className="group group-hover:before:duration-500 group-hover:after:duration-[0.8s] after:duration-[0.8s] hover:border-sky-400  duration-[0.8s] before:duration-[0.8s] hover:duration-[0.8s] underline underline-offset-2    hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-sky-400 hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-sky-900 relative bg-sky-800 h-12 w-52 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-cyan-600 after:right-8 after:top-3 after:rounded-full after:blur">
                            Voir plus
                            </button>
                            </Link>
                        </div>
                        )
                    }
                    else{
                        ''
                    }
                })}
            </section>
        </>
    );
}

