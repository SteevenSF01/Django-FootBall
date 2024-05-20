import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function JoueurModifier() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [age, setAge] = useState(0);
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [genre, setGenre] = useState('');
    const [photo, setPhoto] = useState(null);
    const [pace, setPace] = useState(0);
    const [defense, setDefense] = useState(0);
    const [dribbling, setDribbling] = useState(0);
    const [passing, setPassing] = useState(0);
    const [physical, setPhysical] = useState(0);
    const [shooting, setShooting] = useState(0);
    const [numero, setNumero] = useState(0);
    const [roleID, setRoleID] = useState('');
    const [paysID, setPaysID] = useState('');
    const [equipeID, setEquipeID] = useState('');

    const [pays, setPays] = useState([]);
    const [roles, setRoles] = useState([]);
    const [equipes, setEquipes] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchJoueur = async () => {
            try {
                const joueurResponse = await axios.get(`http://127.0.0.1:8000/api/joueurs/${id}/`);
                const joueur = joueurResponse.data;
                setNom(joueur.nom);
                setPrenom(joueur.prenom);
                setAge(joueur.age);
                setTelephone(joueur.telephone);
                setEmail(joueur.email);
                setGenre(joueur.genre);
                setPaysID(joueur.pays);
                setRoleID(joueur.role);
                setEquipeID(joueur.equipe);
                setPace(joueur.pace);
                setDefense(joueur.defense);
                setDribbling(joueur.dribbling);
                setPassing(joueur.passing);
                setPhysical(joueur.physical);
                setShooting(joueur.shooting);
                setNumero(joueur.numero);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchData = async () => {
            try {
                const paysResponse = await axios.get('http://127.0.0.1:8000/api/pays/');
                setPays(paysResponse.data);
                const rolesResponse = await axios.get('http://127.0.0.1:8000/api/roles/');
                setRoles(rolesResponse.data);
                const equipesResponse = await axios.get('http://127.0.0.1:8000/api/equipes/');
                setEquipes(equipesResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchJoueur();
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('age', age);
        formData.append('telephone', telephone);
        formData.append('email', email);
        formData.append('genre', genre);
        formData.append('pays', paysID);
        formData.append('role', roleID);
        formData.append('equipe', equipeID);
        if (photo) {
            formData.append('photo', photo);
        }
        formData.append('pace', pace);
        formData.append('defense', defense);
        formData.append('dribbling', dribbling);
        formData.append('passing', passing);
        formData.append('physical', physical);
        formData.append('shooting', shooting);
        formData.append('numero', numero);

        try {
            await axios.put(`http://127.0.0.1:8000/api/joueurs/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>JoueurModifier</h1>
            <form onSubmit={handleSubmit} className='text-white px-0 flex-wrap gap-x-5 mx-auto flex w-[700px]' encType="multipart/form-data" method='POST'>
                <div className="mb-4 flex flex-wrap w-80">
                    <label htmlFor="nom" className="block">Nom:</label>
                    <input id="nom" type="text" value={nom} onChange={(e) => setNom(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                    <label htmlFor="prenom" className="block">Prenom:</label>
                    <input id="prenom" type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                    <label htmlFor="age" className="block">Age:</label>
                    <input id="age" min={1} max={120} type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                    <label htmlFor="telephone" className="block">Telephone:</label>
                    <input id="telephone" type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                    <label htmlFor="email" className="block">Email:</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                    <label htmlFor="genre" className="block">Genre:</label>
                    <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400">
                        <option value=""> </option>
                        <option value="Male">Homme</option>
                        <option value="Female">Femme</option>
                    </select>

                    <label htmlFor="pays" className="block">Pays:</label>
                    <select id="pays" value={paysID} onChange={(e) => setPaysID(parseInt(e.target.value))} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400">
                        <option value=""> </option>
                        {pays.map((element) => (
                            <option value={element.id} key={element.id}>{element.nom}</option>
                        ))}
                    </select>

                    <label htmlFor="roles" className="block">Role:</label>
                    <select id="roles" value={roleID} onChange={(e) => setRoleID(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400">
                        <option value=""> </option>
                        {roles.map((element) => (
                            <option value={element.id} key={element.id}>{element.nom}</option>
                        ))}
                    </select>

                    <label htmlFor="equipe" className="block">Equipe:</label>
                    <select id="equipe" value={equipeID} onChange={(e) => setEquipeID(parseInt(e.target.value))} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400">
                        <option value=""> </option>
                        {equipes.map((element) => (
                            <option value={element.id} key={element.id}>{element.nom}</option>
                        ))}
                    </select>

                    <label className="block mb-2 text-white" htmlFor="file_input">Photo:</label>
                    <input className="block w-full border rounded-lg cursor-pointer bg-gray-800 text-white focus:outline-none" id="file_input" type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                </div>
                <div className="mb-0 flex flex-col w-80">
                    <label htmlFor="pace" className="block ">Pace:</label>
                    <input id="pace" type="number" min={1} max={100} value={pace} onChange={(e) => setPace(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                    <label htmlFor="defense" className="block">Defense:</label>
                    <input id="defense" type="number" min={1} max={100} value={defense} onChange={(e) => setDefense(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                    <label htmlFor="dribbling" className="block">Drible:</label>
                    <input id="dribbling" type="number" min={1} max={100} value={dribbling} onChange={(e) => setDribbling(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                    <label htmlFor="passing" className="block">Passe:</label>
                    <input id="passing" type="number" min={1} max={100} value={passing} onChange={(e) => setPassing(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                    <label htmlFor="physical" className="block">Physique:</label>
                    <input id="physical" type="number" min={1} max={100} value={physical} onChange={(e) => setPhysical(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                    <label htmlFor="shooting" className="block">Tir:</label>
                    <input id="shooting" type="number" min={1} max={100} value={shooting} onChange={(e) => setShooting(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                    <label htmlFor="numero" className="block">Numero:</label>
                    <input id="numero" type="number" min={1} max={100} value={numero} onChange={(e) => setNumero(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit my-auto">Modifier</button>
            </form>        
        </div>
    );
}
