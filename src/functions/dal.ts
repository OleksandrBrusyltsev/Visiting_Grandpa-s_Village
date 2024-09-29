import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decrypt } from '@/actions/admin/auth';

export const verifySession = async () => {
    const cookie = cookies().get('access_token')?.value;
    const session = await decrypt(cookie);
    
    if (!["admin", "superadmin"].includes(session?.user_type || '')) {
        redirect('/login');
    }
    
    return { role: session?.user_type || '' };
};
