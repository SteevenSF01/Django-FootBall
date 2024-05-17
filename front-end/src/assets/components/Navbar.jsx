import React from 'react'
import { useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import './../../index.css'

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
            <nav className="bg-gray-200 py-3 px-5 flex justify-between items-center fixed top-0 w-full z-10 rounded-b-xl">
                <h1 className='text-3xl font-medium text-gray-800 font-sans'>ProTeam</h1>
                <div className="flex gap-x-10">
                    <ul className="gap-x-5 text-gray-600 items-center hidden md:flex">
                        {links.map((link) => {
                            return (
                                <Link className="cursor-pointer hover:underline" key={link.name} to={link.href}>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </ul>
                    <div className={`relative block md:hidden `}>
                        <div
                            className="flex items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-2 px-4 rounded-lg"
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
                    <button
                        className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 py-2 rounded-lg cursor-pointer"
                        onClick={toggleMenu}
                    >
                        shop
                    </button>
                </div>
            </nav>
            <div className="pt-20">
                <Outlet />
            </div>
        </>
    );
}
