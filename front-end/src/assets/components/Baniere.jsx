import React from 'react';

export default function Baniere() {
    return (
        <section className='relative h-[520px] w-full shadow-white shadow-sm'>
            <div className='relative h-full bg-baniereHome bg-cover bg-center'>
                <div className='absolute inset-0 bg-black bg-opacity-60'></div>
                <div className='absolute inset-0 flex items-center justify-center flex-col text-white text-2xl font-bold'>
                    <h1 className='text-5xl'>ProSoccer</h1> <br/>
                    <p className='text-lg'>Unis par la passion du jeu</p>
                </div>
            </div>
        </section>
    );
}
