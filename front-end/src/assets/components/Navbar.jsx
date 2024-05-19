import React from 'react'
import { useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import './../../index.css'
import Baniere from './Baniere';

export default function Navbar() {
    const [toggle, setToggle] = useState(true);
    const [burgerMenu, setBurgerMenu] = useState(true);

    const toggleMenu = () => {
        setToggle(!toggle);
    };

    const links = [
        { name: "Accueil", href: "/" },
        { name: "Les Equipes", href: "/equipes" },
        { name: "Les Joueurs", href: "/joueurs" },
    ];

    return (
        <>
            <nav className="bg-gradient-to-b from-[#020511] to-[#0d1821] py-3 px-5 flex justify-between items-center fixed top-0 w-full z-10 rounded-b-xl">
                <h1 className='text-3xl font-medium text-gray-100 font-sans'>ProTeam</h1>
                <div className="flex gap-x-10">
                    <ul className="gap-x-5 text-gray-200 items-center hidden md:flex">
                        {links.map((link) => {
                            return (
                                <Link className="cursor-pointer hover:underline" key={link.name} to={link.href}>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </ul>
                        <Link to={'/settings'}>
                            <button
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
                            type="button">
                            Settings
                            </button>
                        </Link>
                    <div className={`relative block md:hidden `}>
                        <div
                            className="flex items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-[13px] px-7 rounded-lg text-gray-200 bg-gradient-to-tr from-gray-900 to-gray-800 uppercase font-bold font-sans text-xs"
                            onClick={() => setBurgerMenu(!burgerMenu)}
                        > menu
                        </div>
                        {!burgerMenu ? (
                            <ul className="bg-slate-600 text-white rounded-lg py-2 px-4 top-12 -left-3 absolute flex flex-col text-[11px] ">
                                {links.map((link) => {
                                    return (
                                        <Link
                                            className="my-1 hover:underline cursor-pointer"
                                            key={link.name}
                                            href={link.href}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </ul>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </nav>
            <div className="pt-15">
                <Baniere />
                <Outlet />
            </div>
        </>
    );
}
