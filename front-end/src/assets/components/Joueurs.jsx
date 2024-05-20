import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Joueurs() {
    const [joueurs, setJoueurs] = useState([]);
    const [equipes, setEquipes] = useState([])
    const [pays, setPays] = useState([])

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
                <h1 className="text-5xl text-center mt-5 text-white">Les joueurs</h1>
            <section className="flex flex-wrap gap-5 justify-center p-10">
                {joueurs &&
                    joueurs.map((joueur) => {
                        const totalStats = sumStats(joueur);
                        const equipeJoueur = equipes.find((equipe) => equipe.id === joueur.equipe);
                        const paysJoueur = pays.find((p) => p.id === joueur.pays);
                        return (
                            <div key={joueur.id} className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 w-[250px]">
                                <div className="flex items-end">
                                    <div className="flex flex-col items-center mr-4">
                                        <p className="text-3xl font-bold">{totalStats.toFixed(0)}</p>
                                        <div className="mt-2">
                                        {equipeJoueur && equipeJoueur.logo ? (
                                            <img
                                                className="h-8 w-8"
                                                src={`http://127.0.0.1:8000/${equipeJoueur.logo}`}
                                                alt="Team Logo"
                                            />)
                                            :
                                            (
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
                                <Link to={`/details/joueur/${joueur.id}`} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Voir les détails
                                </Link>
                            </div>
                        );
                    })}
            </section>
        </>
    );
}
