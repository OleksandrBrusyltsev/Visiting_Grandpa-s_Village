import React from 'react'
import Link from 'next/link';

function NotFound() {
    return (
        <>
            <div className="h-[80vh] w-full text-2xl grid place-items-center gap-6">
                <h1 className='self-end'>
                    На жаль, такого будинку не існує...
                </h1>
                <Link href="/dyadus_adm1n_hub" className='self-start hover:underline'>На головну</Link>
            </div>
        </>
    )
}

export default NotFound;