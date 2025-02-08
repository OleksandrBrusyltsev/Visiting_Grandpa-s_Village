import React from 'react';

export default function Loading() {
    return (
        <div className="h-[80vh] w-full text-2xl  grid place-items-center">
            <span>Loading
                <span className='text-4xl animate-loading'>.</span>
                <span className='text-4xl animate-loading [animation-delay:160ms]'>.</span>
                <span className='text-4xl animate-loading [animation-delay:320ms]'>.</span></span>
        </div>
    )
}