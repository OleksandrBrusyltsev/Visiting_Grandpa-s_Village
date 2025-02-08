import React from 'react'
import Link from 'next/link';

function NotFound() {
    return (
        <div className="h-[80vh] w-full text-2xl grid place-items-center gap-6">
            <h1 className='self-end'>
                На жаль, такого розділу для галереі не існує...
            </h1>
            <Link href="/admin_hub" className='self-start hover:underline'>На головну</Link>
        </div>
    )
}

export default NotFound;