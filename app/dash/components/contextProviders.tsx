"use client";
import {getGuilds, Guild} from "@/app/dash/components/serverUtils";
import {useEffect, useState, createContext} from "react";
import React from 'react';
import {useRouter} from "next/navigation";


export const DashContext = createContext<Guild[]>([]);

export function Providers({children}: { children: React.ReactNode }) {
    const [guilds, setGuilds] = useState<Guild[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (guilds.length === 0) {
            getGuilds(true).then((g) => {
                console.log(g);
                if (!g) {
                    router.push("/auth/login");
                    return;
                }
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