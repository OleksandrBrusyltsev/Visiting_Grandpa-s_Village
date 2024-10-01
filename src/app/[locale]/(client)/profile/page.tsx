import { getUser } from '@/actions/admin/auth'
import { UserType } from '@/types/auth';
import { cookies } from 'next/headers';
import React from 'react'

type Props = {}

export default async function page({ }: Props) {
    const accessToken = cookies().get('access_token')?.value || '';
    const user: UserType = await (await getUser(accessToken)).json();

    return (
        <div>User profile page: {user.first_name} {user.last_name}</div>
  )
}