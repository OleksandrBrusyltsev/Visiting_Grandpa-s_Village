import React from 'react'
import { cookies } from 'next/headers';

import AskGrandpa from '@/components/AskGrandpa/AskGrandpa';
import { getUser } from '@/actions/admin/auth'

type Props = {}

export default async function Page({ }: Props) {
    const accessToken = cookies().get('access_token')?.value || '';
    const user: UserType = await (await getUser(accessToken)).json();

  return (
      <>
        <div className='container'>
          <h1 style={{
            textAlign: 'center',
            marginTop: 120,
            marginBottom: 120,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000000'
          }}>
            User profile page: {user.first_name} {user.last_name}
          </h1>
        </div>
        <AskGrandpa />
      </>
  )
}