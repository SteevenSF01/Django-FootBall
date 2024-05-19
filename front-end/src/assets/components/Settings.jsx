import { useState } from 'react';
import JoueurForm from './JoueurForm';
import EquipeForm from './EquipeForm';
import { Link } from 'react-router-dom';

export default function Settings() {
    const [creerJoueur, setCreerJoueur] = useState(true)
    const [creerEquipe, setCreerEquipe] = useState(false)
    const ajoutJoueur = () => {
        setCreerJoueur(true)
        setCreerEquipe(false)
    };

    const ajoutEquipe = () => {
        setCreerEquipe(true)
        setCreerJoueur(false)
    };

    return (
        <section className="flex flex-col items-center justify-center h-full">
            <h1 className="text-gray-200 text-center py-10 text-4xl font-bold">Bienvenue dans les settings</h1>
            <div className="flex gap-4">
                <button
                    className="py-3 px-6 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={ajoutJoueur}
                >
                    Ajouter un joueur
                </button>
                <button
                    className="py-3 px-6 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={ajoutEquipe}
                >
                    Ajouter une équipe
                </button>
            </div>
            <div className="flex gap-4 mt-5">
            <Link to="/settings/joueur">
                <button
                    className="py-3 px-6 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Supprimer/Modifier un Joueur
                </button>
            </Link>
            <Link to="/settings/equipe">
                <button
                    className="py-3 px-6 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Supprimer/Modifier une équipe
                </button>
            </Link>
            </div>
            {creerJoueur && <JoueurForm />}
            {creerEquipe && <EquipeForm />}
        </section>
    );
}
