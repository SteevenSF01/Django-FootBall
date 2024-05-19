import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


export default function Joueurs() {

    const [joueurs, setJoueurs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/joueurs/')
                setJoueurs(response.data);
            }catch(error){
                console.error(error);
            }
        }
        fetchData()
    }, [])
    return (
    <>
        <section className='flex flex-wrap gap-5 justify-center p-10'>
            {joueurs && joueurs.map((joueur) => {
                return(
                    <div key={joueur.id} className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 w-[250px]">
                        <div className="flex items-end">
                            <div className="flex flex-col items-center mr-4">
                                <p className="text-3xl font-bold">{joueur.numero}</p>
                                <div className="mt-2">
                                    {joueur.equipe.logo ? 
                                <img
                                    className="h-8 w-8"
                                    src={`http://127.0.0.1:8000/${joueur.equipe.logo}`}
                                    alt="Team Logo"
                                /> : 
                                ""
                                    }
                                </div>
                                <div className="mt-2">
                                <p>{joueur.pays.nom}</p>
                                </div>
                            </div>
                            <div className="relative h-32 w-32">
                                <img
                                className="absolute object-cover h-full w-full rounded-full"
                                src={`http://127.0.0.1:8000/${joueur.photo}`}
                                alt={joueur.nom}
                                />
                            </div>
                        </div>
                    <div className="mt-4 text-2xl font-bold uppercase">{joueur.nom}</div>
                        <div className="grid grid-cols-3 gap-4 mt-4 w-full text-center">
                            <div>
                                <div className="text-lg font-bold">{joueur.pace}</div>
                                <div className="text-sm">PAC</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold">{joueur.dribbling}</div>
                                <div className="text-sm">DRI</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold">{joueur.shooting}</div>
                                <div className="text-sm">SHO</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold">{joueur.defense}</div>
                                <div className="text-sm">DEF</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold">{joueur.passing}</div>
                                <div className="text-sm">PAS</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold">{joueur.physical}</div>
                                <div className="text-sm">PHY</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </section>
    </>
    )
}
