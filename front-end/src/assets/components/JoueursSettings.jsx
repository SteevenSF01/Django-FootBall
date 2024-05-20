import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function JoueursSettings() {
    const [joueurs, setJoueurs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/joueurs/');
                setJoueurs(response.data);
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/joueurs/${id}/`);
            setJoueurs(joueurs.filter((joueur) => joueur.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Link to="/settings">
                <button className='text-white bg-blue-500 m-5 px-5 py-2 rounded-xl'>Retour</button>
            </Link>

            <section className="flex flex-wrap gap-5 justify-center p-10">
                {joueurs &&
                    joueurs.map((joueur) => {
                        const totalStats = sumStats(joueur);
                        return (
                            <div key={joueur.id} className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 w-[250px]">
                                <div className="flex items-end">
                                    <div className="flex flex-col items-center mr-4">
                                        <p className="text-3xl font-bold">{totalStats.toFixed(0)}</p>
                                        <div className="mt-2">
                                            {joueur.equipe && joueur.equipe.logo ? (
                                                <img
                                                    className="h-8 w-8"
                                                    src={`http://127.0.0.1:8000/${joueur.equipe.logo}`}
                                                    alt="Team Logo"
                                                />
                                            ) : (
                                                <div className="h-8 w-8 bg-gray-300 flex justify-center items-center text-[8px] px-2">No Team</div>
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            {joueur.pays && <p>{joueur.pays.nom}</p>}
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
                                <div className="flex justify-between w-full mt-4">
                                    <button
                                        onClick={() => handleDelete(joueur.id)}
                                        className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                                    >
                                        Supprimer
                                    </button>
                                    <Link to={`/settings/joueur/${joueur.id}`}>
                                    <button className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
                                        Modifier
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
            </section>
        </>
    );
}
