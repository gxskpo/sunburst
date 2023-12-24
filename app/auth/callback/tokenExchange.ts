'use server';
import {cookies} from "next/headers";

export default async function exhangeToken(code: string): Promise<boolean> {
    if (!code) throw new Error('No code provided')
    const id: string = process.env.CLIENT_ID!;
    const secret: string = process.env.CLIENT_SECRET!;
    const isProd: boolean = process.env.ENVRT === 'production';
    let redirect_url;

    if (!isProd) {
        redirect_url = 'http://' + process.env.DOMAIN + '/auth/callback';
    } else {
        redirect_url = 'https://' + process.env.DOMAIN + '/auth/callback';
    }
    const body = {
        'client_id': id,
        'client_secret': secret,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirect_url,
        'scope': 'identify email guilds'
    };
    const encodedBody = Object.keys(body)
        // @ts-ignore
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
        .join('&');

    const res = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodedBody
    });
    if (!res.ok) throw new Error('Failed to exchange token');

    const data = await res.json();
    cookies().set({
        name: 'refresh_token',
        value: data.refresh_token,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 30
    });

    cookies().set({
        name: 'access_token',
        value: data.access_token,
        path: '/',
        httpOnly: true,
        maxAge: data.expires_in
    });

    return true;
}