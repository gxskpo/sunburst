"use client";
import {useEffect, useContext}  from "react";
import {useRouter} from "next/navigation";
import {DashContext} from "../components/contextProviders";
import {Guild} from "../components/serverUtils";

export default function ManageGuild({ params }: { params: { guild_id: string } }) {
    const router = useRouter();
    const { guild_id } = params;

    const guilds = useContext(DashContext);

    useEffect(() => {
        let currentGuild = guilds.find((guild: Guild) => guild.id === guild_id) ?? null;
        if (!currentGuild) {
            router.push("/dash");
        } else {
            const selectElement = document.getElementById("guildSelect") as HTMLSelectElement;
            selectElement.querySelectorAll("option").forEach((option) => {
                // @ts-ignore
                if (option.value === currentGuild.id) {
                    option.selected = true;
                }
            });
        }
    });

    return (
        <>
        </>
    )
}