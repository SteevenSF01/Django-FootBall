import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AOS from 'aos'
import './../../../node_modules/aos/dist/aos.css'



export default function Joueurs() {
    const [joueurs, setJoueurs] = useState([]);
    const [equipes, setEquipes] = useState([])
    const [pays, setPays] = useState([])

    useEffect(() => {
        AOS.init({duration : 2000})
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/joueurs/');
                setJoueurs(response.data);

                const equipe = await axios.get('http://127.0.0.1:8000/api/equipes/');
                setEquipes(equipe.data);

                const pays = await axios.get('http://127.0.0.1:8000/api/pays/');
                setPays(pays.data);
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
console.log(joueurs);
    return (
        <>
            <h1 className="text-5xl text-center mt-5 text-white">Les joueurs</h1>
            <section className="flex flex-wrap gap-10 justify-center p-10" data-aos=''>
            {joueurs && joueurs.map((joueur)=> {
                const equipeJoueur = equipes.find((equipe) => equipe.id === joueur.equipe);
                const paysJoueur = pays.find((p) => p.id === joueur.pays);
                return(
                    <div className="fut-player-card" data-aos='flip-right'>
                        <div className="player-card-top" >
                            <div className="player-master-info" >
                                <div className="player-rating">
                                    <span>{sumStats(joueur).toFixed(0)}</span>
                                </div>
                                <div className="player-position">
                                </div>
                                <div className="player-nation">
                                    {paysJoueur && <p>{paysJoueur.nom}</p>}
                                </div>
                                <div className="player-club">
                                    { equipeJoueur && <img src={`http://127.0.0.1:8000/${equipeJoueur.logo}`} alt="Barcelona" draggable="false"/>}
                                </div>
                            </div>
                            <div className="player-picture">
                                <img src={`http://127.0.0.1:8000/${joueur.photo}`} alt={joueur.prenom} draggable="false"/>
                            </div>
                        </div>
                        <div className="player-card-bottom">
                            <div className="player-info">
                                <div className="player-name">
                                    <Link to={`/details/joueur/${joueur.id}`}>
                                    <span>{joueur.prenom}</span>
                                    </Link>
                                </div>
                                <div className="player-features">
                                    <div className="player-features-col">
                                        <span>
                                            <div className="player-feature-value">{joueur.pace}</div>
                                            <div className="player-feature-title">PAC</div>
                                        </span>
                                        <span>
                                            <div className="player-feature-value">{joueur.shooting}</div>
                                            <div className="player-feature-title">SHO</div>
                                        </span>
                                        <span>
                                            <div className="player-feature-value">{joueur.passing}</div>
                                            <div className="player-feature-title">PAS</div>
                                        </span>
                                    </div>
                                    <div className="player-features-col">
                                        <span>
                                            <div className="player-feature-value">{joueur.dribbling}</div>
                                            <div className="player-feature-title">DRI</div>
                                        </span>
                                        <span>
                                            <div className="player-feature-value">{joueur.defense}</div>
                                            <div className="player-feature-title">DEF</div>
                                        </span>
                                        <span>
                                            <div className="player-feature-value">{joueur.physical}</div>
                                            <div className="player-feature-title">PHY</div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                        )
                    })}
            </section> 
        </>
    );
}
