import React from 'react';
import './cardHome.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CardHomeJoueur() {
    const [joueurs, setJoueurs] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const joueurs = await axios.get('http://127.0.0.1:8000/api/joueurs/');
        setJoueurs(joueurs.data);
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
            return (
                joueur.equipe == null ? (
            <div className="card" key={joueur.id}>
                <img src={`http://127.0.0.1:8000/${joueur.photo}`} alt={joueur.nom} className="player-image" />
                <Link to={`/details/joueur/${joueur.id}`} className='z-20'>
                <h2 className="title">{joueur.nom}</h2>
                </Link>
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
