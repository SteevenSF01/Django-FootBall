import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EquipeForm() {
    const [nom, setNom] = useState('');
    const [continentID, setContinentID] = useState('');
    const [paysID, setPaysID] = useState('');
    const [logo, setLogo] = useState(null);
    const [maxJoueurs, setMaxJoueurs] = useState(0);
    const [continents, setContinents] = useState([]);
    const [pays, setPays] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const continentsResponse = await axios.get('http://127.0.0.1:8000/api/continents/');
                const paysResponse = await axios.get('http://127.0.0.1:8000/api/pays/');
                setContinents(continentsResponse.data);
                setPays(paysResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

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
            const response = await axios.post('http://127.0.0.1:8000/api/equipes/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setNom('');
            setContinentID('');
            setPaysID('');
            setLogo(null);
            setMaxJoueurs(0);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='text-white px-0 flex-wrap gap-x-5 mx-auto flex w-[700px] my-10' encType="multipart/form-data" method='POST'>
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
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit my-auto">Créer</button>
        </form>
    );
}
