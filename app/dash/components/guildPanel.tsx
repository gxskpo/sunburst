"use client";
import styles from '../Dash.module.css'
import {Guild} from './serverUtils'

export default function GuildPanel(props: {guild: Guild}){
    const sunburstPresent = props.guild.sunburstPresent;

    return (
        <div className={styles.guildPanel}>
            <img src={`https://cdn.discordapp.com/icons/${props.guild.id}/${props.guild.icon}.png`} alt="Guild Icon" />
            <h3>{props.guild.name}</h3>
            {
                sunburstPresent ?
                <div className={styles.sunburstPresent}>
                    <p>Sunburst is present</p>
                </div>
                :
                <div className={styles.sunburstAbsent}>
                    <p>Sunburst is absent</p>
                </div>
            }

        </div>
    )

}