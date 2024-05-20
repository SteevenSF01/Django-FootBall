import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CardHomeEquipe'

export default function CardHomeEquipe() {
    const [equipes, setEquipes] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const joueurs = await axios.get('http://127.0.0.1:8000/api/equipes/');
        setEquipes(joueurs.data);
        } catch (error) {
        console.error(error);
        }
    };
    fetchData();
    }, []);

    return (
    <div className="flex flex-wrap justify-center gap-5 items-center mt-5 py-5">
        {equipes &&
        equipes.map((equipe) => {
            return (
                equipe.joueurs.length > 5 ? (
            <div className="card p-5" key={equipe.id}>
                <img src={`http://127.0.0.1:8000/${equipe.logo}`} alt={equipe.nom} className="player-image  " />
                <Link to={`/details/equipe/${equipe.id}`} className='z-20'>
                <h2 className="title">{equipe.nom}</h2>
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
