import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EquipeModifier() {
    const [nom, setNom] = useState('');
    const [continentID, setContinentID] = useState('');
    const [paysID, setPaysID] = useState('');
    const [maxJoueurs, setMaxJoueurs] = useState(0);
    const [logo, setLogo] = useState(null);

    const [continents, setContinents] = useState([]);
    const [pays, setPays] = useState([]);

    const { id } = useParams();

    

    useEffect(() => {
        const fetchEquipe = async () => {
            try {
                const equipeResponse = await axios.get(`http://127.0.0.1:8000/api/equipes/${id}/`);
                const equipe = equipeResponse.data;
                setNom(equipe.nom);
                setContinentID(equipe.continent);
                setPaysID(equipe.pays);
                setMaxJoueurs(equipe.maxJoueurs);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchContinents = async () => {
            try {
                const continentsResponse = await axios.get('http://127.0.0.1:8000/api/continents/');
                setContinents(continentsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchPays = async () => {
            try {
                const paysResponse = await axios.get('http://127.0.0.1:8000/api/pays/');
                setPays(paysResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEquipe();
        fetchContinents();
        fetchPays();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('continent', continentID);
        formData.append('pays', paysID);
        formData.append('maxJoueurs', maxJoueurs);
        if (logo) {
            formData.append('logo', logo);
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/equipes/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <section className='h-[500px] pt-20'> 
            <form onSubmit={handleSubmit} className='text-white px-0 flex-wrap gap-x-5 mx-auto flex w-[700px] ' encType="multipart/form-data" method='POST'>
                <div className="mb-4 flex flex-wrap w-80">
                    <label htmlFor="nom" className="block">Nom:</label>
                    <input id="nom" type="text" value={nom} onChange={(e) => setNom(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                    <label htmlFor="continent" className="block">Continent:</label>
                    <select id="continent" value={continentID} onChange={(e) => setContinentID(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400">
                        <option value=""> </option>
                        {continents.map((element) => (
                            <option value={element.id} key={element.id}>{element.nom}</option>
                        ))}
                    </select>

                    <label className="block mb-2 text-white" htmlFor="file_input">Logo:</label>
                    <input className="block w-full border rounded-lg cursor-pointer bg-gray-800 text-white focus:outline-none" id="file_input" type="file" onChange={(e) => setLogo(e.target.files[0])} />
                </div>
                <div className="mb-0 flex flex-col w-80">
                    <label htmlFor="pays" className="block">Pays:</label>
                    <select id="pays" value={paysID} onChange={(e) => setPaysID(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400">
                        <option value=""> </option>
                        {pays.map((element) => (
                            <option value={element.id} key={element.id}>{element.nom}</option>
                        ))}
                    </select>
                    <label htmlFor="maxJoueurs" className="block">Max Joueurs:</label>
                    <input id="maxJoueurs" type="number" min={1} max={20} value={maxJoueurs} onChange={(e) => setMaxJoueurs(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit my-auto">Modifier</button>
            </form>
        </section>
    );
}
