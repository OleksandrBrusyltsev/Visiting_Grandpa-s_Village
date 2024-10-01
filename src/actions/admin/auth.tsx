"use server";

import { cookies } from 'next/headers'
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const url = process.env.SERV_URL;
const key = process.env.JWT_SECRET as string;
const encodedKey = new TextEncoder().encode(key);

type SessionPayload = {
    sub: string;
    user_type: string;
    exp: number;
};

export async function decrypt(token: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload as SessionPayload;
    } catch (error) {
        console.log('Failed to verify session');
    }
}

export async function createSession(
    accessToken: string,
    refreshTokenFromCookie: string,
    response: NextResponse) {

    const exp = (await decrypt(accessToken))!.exp;
    response.headers.set(
        'set-cookie',
        `access_token=${accessToken}; path=/; expires=${new Date(exp * 1000).toUTCString()}; HttpOnly; SameSite=Lax`,
    );
    response.headers.append('set-cookie', refreshTokenFromCookie);
    return response;
}

export async function getSession(request?: NextRequest) {
    
    const accessToken = request ? 
        request.cookies.get('access_token')?.value :
        cookies().get('access_token')?.value;
    
    if (!accessToken) return { user_role: null };

    return {user_role: (await decrypt(accessToken))?.user_type};
}

export async function updateSession(request: NextRequest) {
    const refreshToken = request ?
    request.cookies.get('refresh_token')?.value :
    cookies().get('refresh_token')?.value;
    
    console.log('refreshToken: ', refreshToken);
    if (!refreshToken) {
        return { error: null, access_token: null, refreshTokenCookie: null};
    }
    
    const resp = await fetch(`${url}/api/v1/auth/refresh-token`, {
        method: 'POST',
        headers: {
            Cookie: `refresh_token=${refreshToken}`,
        },
    });
console.log(resp);
    if (!resp.ok) {
        const errorData = await resp.json();
        return {
            error: errorData.error || 'Refresh token failed',
            access_token: null,
            refreshTokenCookie: null
        }
    }
    const { access_token } = await resp.json();
    console.log('access_token: ', access_token);
    const refreshTokenCookie = resp.headers.get('set-cookie') || '';

    return { error: null, access_token, refreshTokenCookie };
}

export const getToken = async (email: string, password: string): Promise<Response> => {

    const body = new URLSearchParams({email, password}).toString();

    const response = await fetch(`${url}/api/v1/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        body,
    })
    return response;   
};

export const getUser = async (token: string): Promise<Response> => {
    const response = await fetch(`${url}/api/v1/auth/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });
    return response;
}

export async function logout() {
    cookies().delete('access_token');
    cookies().delete('refresh_token');
}