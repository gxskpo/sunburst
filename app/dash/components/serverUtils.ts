"use server";
import {cookies} from "next/headers";

export interface Guild {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: number;
    features: string[];
    sunburstPresent?: boolean;
}

export async function checkForBot(guildIds: string[], includeAll: boolean): Promise<Guild[]> {
    let resultantGuilds: Guild[] = [];
    const botToken = process.env.BOT_TOKEN;
    const resp = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
        method: "GET",
        headers: {
            "Authorization": `Bot ${botToken}`
        }
    })
    const guilds = await resp.json();
    guilds.forEach((guild: Guild) => {
        if (guildIds.includes(guild.id)) {
            guild.sunburstPresent = true;
            resultantGuilds.push(guild);
        } else if (includeAll) {
            resultantGuilds.push(guild);
        }
    });
    return resultantGuilds;
}

export async function getGuilds(includeAll?: boolean): Promise<Guild[]> {
    const cookie = cookies();
    const resp = await fetch("https://discord.com/api/v10/users/@me/guilds", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${cookie.get("access_token")?.value}`
        }
    })
    const guilds = await resp.json();
    let gls: Guild[] = [];
    guilds.forEach((guild: Guild) => {
        if ((guild.permissions & 0x0000000000000020) === 0x0000000000000020) {
            gls.push(guild);
        }
    });
    return await checkForBot(gls.map(guild => guild.id), !!includeAll);
}