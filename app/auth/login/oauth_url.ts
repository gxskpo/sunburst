'use server';
import {cookies} from "next/headers";

export default async function getOauthURL() {
    const id: string = process.env.CLIENT_ID!;
    const isProd: boolean = process.env.ENVRT === 'production';
    const baseUrl: string = "https://discord.com/api/oauth2/authorize";
    const scopes: string[] = [
        "identify",
        "email",
        "guilds",
    ];
    const scope: string = scopes.join("%20");
    let redirect_url;
    if (!isProd) {
        redirect_url = 'http://' + process.env.DOMAIN + '/auth/callback';
    } else {
        redirect_url = 'https://' + process.env.DOMAIN + '/auth/callback';
    }
    const url: string = `${baseUrl}?client_id=${id}&redirect_uri=${redirect_url}&response_type=code&scope=${scope}`;
    return url;
}