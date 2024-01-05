"use client";
import styles from './Dash.module.css'
import {useContext} from 'react';
import {Guild} from './components/serverUtils'
import GuildPanel from "@/app/dash/components/guildPanel";
import {DashContext} from "@/app/dash/components/contextProviders";


export default function Dashboard() {
    const guilds = useContext(DashContext);

    return (
        <div className={styles.guildContainer}>
            {
                guilds.map((guild: Guild) => {
                    return (
                        <GuildPanel guild={guild}/>
                    )
                })
            }
        </div>
    )
}