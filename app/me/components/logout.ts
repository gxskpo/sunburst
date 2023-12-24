"use server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function Logout(): Promise<boolean> {
    const refresh_token = cookies().get("refresh_token");
    if (!refresh_token) {
        cookies().delete("access_token");
        cookies().delete("refresh_token");
        return true;
    }

    const body = {
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET,
        'token': refresh_token.value,
        'token_type_hint': 'refresh_token',
    };
    const encodedBody = Object.keys(body)
        // @ts-ignore
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
        .join('&');
    const response = await fetch("https://discord.com/api/oauth2/token/revoke", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: encodedBody
    })
    if (!response.ok) throw new Error("Failed to revoke token");
    cookies().delete("refresh_token");
    cookies().delete("access_token");
    return true;
}