import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EquipeDetails() {
    const [equipe, setEquipe] = useState(null);
    const [pays, setPays] = useState('');
    const [continent, setContinent] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchEquipe = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/equipes/${id}/`);
                setEquipe(response.data);

                const paysResponse = await axios.get(`http://127.0.0.1:8000/api/pays/${response.data.pays}/`);
                setPays(paysResponse.data.nom);

                const continentResponse = await axios.get(`http://127.0.0.1:8000/api/continents/${response.data.continent}/`);
                setContinent(continentResponse.data.nom);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEquipe();
    }, [id]);

    if (!equipe) {
        return <div className="text-center text-white mt-10">Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-[400px]">
                <div className="text-center">
                    <div className="relative w-40 h-40 mx-auto mb-4">
                        <img
                            className="rounded-full object-cover w-full h-full"
                            src={`http://127.0.0.1:8000/${equipe.logo}`}
                            alt={equipe.nom}
                        />
                    </div>
                    <h2 className="text-4xl font-bold mb-2">{equipe.nom}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="font-semibold">Continent:</p>
                        <p>{continent}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Pays:</p>
                        <p>{pays}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Joueurs dans l'équipe:</p>
                        <p>{equipe.joueurs.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
