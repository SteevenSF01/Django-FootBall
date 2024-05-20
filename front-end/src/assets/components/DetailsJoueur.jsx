import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function JoueurDetails() {
    const [joueur, setJoueur] = useState(null);
    const [roles, setRoles] = useState([])
    const [pays, setPays] = useState([])
    const { id } = useParams();

    useEffect(() => {
        const fetchJoueur = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/joueurs/${id}/`);
                setJoueur(response.data);
        
                const rolesResponse = await axios.get(`http://127.0.0.1:8000/api/roles/${response.data.role}`);
                if (rolesResponse.data) {
                    setRoles(rolesResponse.data.nom);
                }
        
                const paysResponse = await axios.get(`http://127.0.0.1:8000/api/pays/${response.data.pays}/`);
                if (paysResponse.data) {
                    setPays(paysResponse.data.nom);
                }
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchJoueur();
    }, [id]);

    if (!joueur) {
        return <div className="text-center text-white mt-10">Loading...</div>;
    }


    return (
        <>
            <section className='py-10'>
                <Link to="/lesjoueurs">
                <button className='bg-white px-5 py-1 m-5 rounded-xl'>Retour</button>
                </Link>
                <div className="flex justify-center items-center min-h-screen text-white">
                    <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-[400px]">
                        <div className="text-center">
                            <div className="relative w-40 h-40 mx-auto mb-4">
                                <img
                                    className="rounded-full object-cover w-full h-full"
                                    src={`http://127.0.0.1:8000/${joueur.photo}`}
                                    alt={joueur.nom}
                                />
                            </div>
                            <h2 className="text-4xl font-bold mb-2">{joueur.nom} {joueur.prenom}</h2>
                            <p className="text-lg text-gray-400 mb-4">{joueur.email}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="font-semibold">Age:</p>
                                <p>{joueur.age}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Téléphone:</p>
                                <p>{joueur.telephone}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Genre:</p>
                                <p>{joueur.genre}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Pays:</p>
                                <p>{pays}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Role:</p>
                                <p>{roles}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Équipe:</p>
                                <p>{joueur.equipe ? joueur.equipe.nom : 'No Team'}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-lg font-bold">{joueur.pace}</p>
                                <p className="text-sm">Pace</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">{joueur.dribbling}</p>
                                <p className="text-sm">Dribbling</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">{joueur.shooting}</p>
                                <p className="text-sm">Shooting</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">{joueur.defense}</p>
                                <p className="text-sm">Defense</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">{joueur.passing}</p>
                                <p className="text-sm">Passing</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">{joueur.physical}</p>
                                <p className="text-sm">Physical</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
