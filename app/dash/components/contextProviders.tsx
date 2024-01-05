"use client";
import {getGuilds, Guild} from "@/app/dash/components/serverUtils";
import {useEffect, useState, createContext} from "react";
import {dispatchNotification} from "@/app/nfWidget";
import React from 'react';


export const DashContext = createContext<Guild[]>([]);

export function Providers({children}: { children: React.ReactNode }) {
    const [guilds, setGuilds] = useState<Guild[]>([]);

    useEffect(() => {
        if (guilds.length === 0) {
            try {
                getGuilds().then((g) => {
                    setGuilds(g);
                });
            } catch (e) {
                dispatchNotification('fas fa-exclamation-triangle', 'Error', 'Failed to load guilds', 'Try again').then(() => {
                    window.location.reload();
                })
            }
        }
    }, [guilds]);

    return (
        <DashContext.Provider value={guilds}>
            {children}
        </DashContext.Provider>
    );
}