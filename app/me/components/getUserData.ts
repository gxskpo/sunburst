"use server";
import {cookies} from "next/headers";

export default async function getUserData() {
    const cookie = cookies().get("access_token");
    if (!cookie) return null;
    const res = await fetch("https://discord.com/api/users/@me", {
        headers: {
            "Authorization": `Bearer ${cookie.value}`
        }
    });
    if (!res.ok) return null;
    const data =  await res.json();
    data.avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`;
    return data;

}


