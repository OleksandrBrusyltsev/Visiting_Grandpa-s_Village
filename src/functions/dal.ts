import 'server-only';

import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decrypt } from '@/actions/admin/auth';

export const verifySession = cache(async () => {
    const cookie = cookies().get('access_token')?.value;
    const session = await decrypt(cookie);
    
    if (!session?.user_type) {
        redirect('/uk/dyadus_adm1n_hub/login');
    }
    
    return { role: session?.user_type };
});
