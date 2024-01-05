"use server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";


export interface Guild {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: number;
    features: string[];
    sunburstPresent?: boolean;
    selected?: boolean;
}

export async function checkForBot(guildIds: string[], includeAll: boolean): Promise<Guild[]> {
    let resultantGuilds: Guild[] = [];
    console.log(includeAll)
    const botToken = process.env.BOT_TOKEN;
    const resp = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
        method: "GET",
        headers: {
            "Authorization": `Bot ${botToken}`
        }
    })
    if (resp.status !== 200) {
        throw new Error("Failed to get guilds");
    }
    const guilds = await resp.json();
    guilds.forEach((guild: Guild) => {
        if (guildIds.includes(guild.id)) {
            guild.sunburstPresent = true;
            resultantGuilds.push(guild);
        }
    });
    return resultantGuilds;
}

export async function getGuilds(includeAll?: boolean): Promise<Guild[] | null> {
    const cookie = cookies();
    const resp = await fetch("https://discord.com/api/v10/users/@me/guilds", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${cookie.get("access_token")?.value}`
        }
    })
    if (resp.status !== 200) {
        if (resp.status === 429) {
            throw new Error("You are being rate limited");
        }
        if (resp.status === 401) {
            cookies().delete("access_token");
            cookies().delete("refresh_token");
            redirect(`/auth/login`);
        }
        throw new Error("Failed to get guilds");
    }
    const guilds = await resp.json();
    let gls: Guild[] = [];
    guilds.forEach((guild: Guild) => {
        if ((guild.permissions & 0x0000000000000020) === 0x0000000000000020) {

            gls.push(guild);
        }
    });
    let results: Guild[] = await checkForBot(gls.map(guild => guild.id), !!includeAll);
    if (includeAll) {
        gls.forEach(guild => {
            if (!results.find(g => g.id === guild.id)) {
                if ((guild.permissions & 0x0000000000000020) === 0x0000000000000020) {
                    results.push(guild);
                }
            }
        })
    }
    return results;
}