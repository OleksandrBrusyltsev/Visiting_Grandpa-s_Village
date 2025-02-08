import React from 'react';
import { getContacts } from '@/actions/getContacts';
import Contacts from '@/components/Admin/Pages/Contacts/Contacts';

export default async function Page() {
    const contacts = await getContacts();
    return (
        <div className='p-8'>
            <h1 className='text-2xl text-center mb-10'>Редагування сторінки ЗНАЙТИ МЕНЕ</h1>
            {
                contacts.address
                    ? <Contacts data={contacts} />
                    : <h2 className='text-3xl text-center mt-[200px] text-red-600'>
                        Хтось схавав дані для рендеру сторінки, але ви тримайтесь!
                    </h2>
            }
        </div>
    )
}