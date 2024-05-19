import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function JoueurForm() {

    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [age, setAge] = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')
    const [genre, setGenre] = useState('')
    const [pays, setPays] = useState('')
    const [role, setRole] = useState('')
    const [equipe, setEquipe] = useState('')
    const [photo, setPhoto] = useState('')
    const [pace, setPace] = useState(0)
    const [defense, setDefense] = useState(0)
    const [dribbling, setDribbling] = useState(0)
    const [passing, setPassing] = useState(0)
    const [physical, setPhysical] = useState(0)
    const [shooting, setShooting] = useState(0)
    const [numero, setNumero] = useState(0)


    return (
        <>
            <section className='my-10' >
                <form onSubmit={''} className='text-white px-0 flex-wrap gap-x-5 mx-auto flex w-[700px] '>
                    <div className="mb-4 flex flex-wrap w-80">

                        <label htmlFor="nom" className="block">Nom:</label>
                        <input id="nom" type="text" value={nom} onChange={(e) => setNom(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                        <label htmlFor="prenom" className="block">Prenom:</label>
                        <input id="prenom" type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                        <label htmlFor="age" className="block">Age:</label>
                        <input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

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
                        <input id="pays" type="text" value={pays} onChange={(e) => setPays(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                        <label htmlFor="role" className="block">Role:</label>
                        <input id="role" type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                        <label htmlFor="equipe" className="block">Equipe:</label>
                        <input id="equipe" type="text" value={equipe} onChange={(e) => setEquipe(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

                        <label htmlFor="photo" className="block">Photo:</label>
                        <input id="photo" type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />

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
                        <input id="numero" type="number" min={1} max={100}  value={numero} onChange={(e) => setNumero(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-400" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit my-auto">Créer</button>
                </form>
            </section>
        </>
    )
}
