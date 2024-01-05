"use client";
import {Guild} from "./serverUtils";
import React from 'react';
import {useRouter} from "next/navigation";
import {dispatchNotification} from "@/app/nfWidget";
import {useContext, useEffect} from "react";
import {DashContext} from "./contextProviders";


export default function TopBar() {

    const router = useRouter();
    const guilds = useContext(DashContext);

    useEffect(() => {
        const selectElement = document.getElementById("guildSelect") as HTMLSelectElement;
        selectElement.options[0].selected = true;
    });


    const handleSelect = (evType: string, ev: React.ChangeEvent<HTMLSelectElement>) => {
        switch (evType) {
            case "guild":
                if (ev.target.value !== "0") {
                    const selectElement = document.getElementById("guildSelect") as HTMLSelectElement;
                    selectElement.options[0].textContent = "Inicio"
                    router.push(`/dash/${ev.target.value}`);
                } else {
                    const selectElement = document.getElementById("guildSelect") as HTMLSelectElement;
                    selectElement.options[0].textContent = "Selecciona un servidor"
                    router.push("/dash");
                }
                break;
            case "bot":
                if (ev.target.value === "new") {
                    dispatchNotification("fas fa-exclamation-triangle", "Error",
                        "Esta función aún no está disponible");
                    ev.target.value = "1";
                }
                break;
        }
    }
    return (
        <div className="dashboardTopBar">
            <a href="/" className="home-button"> <i className="fas fa-home"/> </a>
            <select onChange={(ev) => handleSelect("bot", ev)} id="botSelect">
                <option value="1">SunBurst</option>
                <option value="new">+ Nuevo bot</option>
            </select>
            <div className="separator">
                <i className="fas fa-chevron-right"/>
            </div>
            <select onChange={(ev) => handleSelect("guild", ev)} id="guildSelect">
                <option id="guildOptionPlaceholder" value="0">
                    {guilds.length === 0 ? "Cargando..." : "Selecciona un servidor"}
                </option>
                {
                    guilds.map((guild: Guild) => {
                        if (guild.sunburstPresent) {
                            return (
                                <option value={guild.id}>{guild.name}</option>
                            )
                        }
                    })
                }
            </select>
        </div>
    )
}