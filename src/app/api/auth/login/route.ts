import { NextResponse } from 'next/server';

import { createSession, getToken, getUser } from '@/actions/admin/auth';

export async function POST(request: Request) {
    const credentials = await request.json() as { email: string; password: string };
    const { email, password } = credentials;
    
    let accessTokenData: { access_token: string } = { access_token: '' },
        refreshTokenCookie: string | null;

    try {
        const response = await getToken(email, password);
        if(response.ok) {
            accessTokenData = await response.json();
            refreshTokenCookie = response.headers.get('set-cookie') || '';
        } else {
            const errorData: {
                detail: [
                    {
                        loc: (string | number)[];
                        msg: string;
                        type: string
                    }
                ]
            } = await response.json();
            return Response.json({ error: errorData.detail[0].msg || 'Invalid credentials' }, { status: 403 });
        } 

    }
    catch (error) {
        console.log('Failed to get token: ', error);
        return Response.json({ error: 'Failed to get token' }, { status: 500 });
    }

    try {
        const response = await getUser(accessTokenData.access_token);
        if (!response.ok) {
            const errorData: {
                detail: string;
            } = await response.json();
            
            return Response.json(
                { error: errorData.detail || 'Failed to get user' },
                { status: 401 },
            );
        }

        const user: UserType = await response.json();
        const res = NextResponse.json(user);

        return await createSession(accessTokenData.access_token, refreshTokenCookie, res);
    } catch (error) {
        return Response.json({ error: 'Failed to get user' }, { status: 500 });
    }
}
