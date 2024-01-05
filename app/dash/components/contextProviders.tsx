"use client";
import {getGuilds, Guild} from "@/app/dash/components/serverUtils";
import {useEffect, useState, createContext} from "react";
import React from 'react';



export const DashContext = createContext<Guild[]>([]);

export function Providers({ children }: { children: React.ReactNode }) {
    const [guilds, setGuilds] = useState<Guild[]>([]);

    useEffect(() => {
        // Check if guilds are already loaded
        if (guilds.length === 0) {
            getGuilds().then((g) => {
                setGuilds(g);
            });
        }
    }, [guilds]);

    return (
        <DashContext.Provider value={guilds}>
            {children}
        </DashContext.Provider>
    );
}