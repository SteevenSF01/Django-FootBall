import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AOS from 'aos'
import './../../../node_modules/aos/dist/aos.css'

export default function CardHomeJoueur() {
    const [joueurs, setJoueurs] = useState([]);
    const [equipes, setEquipes] = useState([]);
    const [pays, setPays] = useState([]);

    useEffect(() => {
        AOS.init({duration : 2000})
    }, [])
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/joueurs/');
                setJoueurs(response.data);

                const equipe = await axios.get('http://127.0.0.1:8000/api/equipes/');
                setEquipes(equipe.data);

                const pays = await axios.get('http://127.0.0.1:8000/api/pays/');
                setPays(pays.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const sumStats = (joueur) => {
        return (
            (joueur.pace + joueur.dribbling + joueur.shooting + joueur.defense + joueur.passing + joueur.physical) / 6
        );
    };

    return (
        <>
            <section className="flex flex-wrap gap-5 justify-center p-10" data-aos='fade-up-right'>
                {joueurs &&
                    joueurs.map((joueur) => {
                        const totalStats = sumStats(joueur);
                        const equipeJoueur = equipes.find((equipe) => equipe.id === joueur.equipe);
                        const paysJoueur = pays.find((p) => p.id === joueur.pays);

                        if (joueur.equipe == null) {
                            return (
                                <div key={joueur.id} className="flex flex-col items-center bg-gradient-to-tl from-white to bg-gray-400 rounded-lg shadow-lg p-4 w-[250px]">
                                    <div className="flex items-end">
                                        <div className="flex flex-col items-center mr-4">
                                            <p className="text-3xl font-bold">{totalStats.toFixed(0)}</p>
                                            <div className="mt-2">
                                                {equipeJoueur && equipeJoueur.logo ? (
                                                    <img
                                                        className="h-8 w-8"
                                                        src={`http://127.0.0.1:8000/${equipeJoueur.logo}`}
                                                        alt="Team Logo"
                                                    />
                                                ) : (
                                                    <p className='font-semibold'>Free</p>
                                                )}
                                            </div>
                                            <div className="mt-2 font-semibold">
                                                {paysJoueur && <p>{paysJoueur.nom}</p>}
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
                                    <Link to={`/details/joueur/${joueur.id}`} >
                                        <button className="group group-hover:before:duration-500 group-hover:after:duration-[0.8s] after:duration-[0.8s] hover:border-sky-400 duration-[0.8s] before:duration-[0.8s] hover:duration-[0.8s] underline underline-offset-2 hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-sky-400 hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-sky-900 relative bg-sky-800 h-12 w-52 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-400 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-cyan-600 after:right-8 after:top-3 after:rounded-full after:blur mt-5">
                                            Voir plus
                                        </button>
                                    </Link>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
            </section>
        </>
    );
}
