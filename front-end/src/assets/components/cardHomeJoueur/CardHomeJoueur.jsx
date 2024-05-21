import React from 'react';
import './cardHome.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CardHomeJoueur() {
    const [joueurs, setJoueurs] = useState([]);
    const [roles, setRoles] = useState([])

    useEffect(() => {
    const fetchData = async () => {
        try {
        const joueurs = await axios.get('http://127.0.0.1:8000/api/joueurs/');
        setJoueurs(joueurs.data);

        const roles = await axios.get('http://127.0.0.1:8000/api/roles/');
        setRoles(roles.data);
        } catch (error) {
        console.error(error);
        }
    };
    fetchData();
    }, []);
    return (
    <div className="flex flex-wrap justify-center gap-5 items-center min-h-screen py-8">
        {joueurs &&
        joueurs.map((joueur) => {
            const roleJoueur = roles.find((role)=> role.id === joueur.role)
            return (
                joueur.equipe == null ? (
            <div className="card" key={joueur.id}>
                <img src={`http://127.0.0.1:8000/${joueur.photo}`} alt={joueur.nom} className="player-image" />
                <Link to={`/details/joueur/${joueur.id}`} className='z-20'>
                <div className='flex flex-col leading-8 items-center'>
                    <h2 className="title">{joueur.nom}</h2>
                    <p className="text-white text-lg">{joueur.prenom}</p>
                </div>
                </Link>
                <div className="">
                    {roleJoueur && <p className='text-white text-xl'>Role: <span className='text-sm '>{roleJoueur.nom}</span></p>}
                </div>
                <div className="gradient"></div>
                <div className="overlay"></div>
            </div>)
            :
            ''
            );
        })}
    </div>
    );
}
