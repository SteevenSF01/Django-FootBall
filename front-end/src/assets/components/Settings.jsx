import React from 'react';

export default function Settings() {
    const ajoutJoueur = () => {
    };

    const ajoutEquipe = () => {
    };

    return (
        <section className="flex flex-col items-center justify-center h-full">
            <h1 className="text-gray-200 text-center py-10 text-4xl font-bold">Bienvenue dans les settings</h1>
            <div className="flex gap-4">
                <button
                    className="py-3 px-6 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleAddPlayer}
                >
                    Ajouter un joueur
                </button>
                <button
                    className="py-3 px-6 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={handleAddTeam}
                >
                    Ajouter une équipe
                </button>
            </div>
        </section>
    );
}
