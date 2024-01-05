"use client";
import styles from '../Dash.module.css'
import {Guild} from './serverUtils'
import {useRouter} from "next/navigation";


export default function GuildPanel(props: { guild: Guild }) {
    const sunburstPresent = props.guild.sunburstPresent;
    const router = useRouter();

    const addToServer = (guild: Guild) => {
        const guildId = guild.id;
        const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
        const permissions = "9897215552535";
        let invite = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot&guild_id=${guildId}&disable_guild_select=true`;
        let wind = window.open(invite, '_blank');
        wind?.focus();
    }

    const manageServer = (guild: Guild) => {
        guild.selected = true;
        router.push(`/dash/${guild.id}`);
    }

    return (
        <div className={styles.guildPanel}>
            <img
                src={props.guild.icon ? `https://cdn.discordapp.com/icons/${props.guild.id}/${props.guild.icon}.png?size=100` :
                    "/def_guild_icon.png"
                } alt="Guild Icon"/>
            <h3>{props.guild.name}</h3>
            {
                sunburstPresent ?
                    <button className={styles.manageServer} onClick={() => manageServer(props.guild)}>
                        <i className="fas fa-cog"/> Manage Server
                    </button>
                    :
                    <button className={styles.addToServer} onClick={() => addToServer(props.guild)}>
                        <i className="fas fa-plus"/> Add Sunburst
                    </button>
            }
        </div>
    )

}