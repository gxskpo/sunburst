import {Metadata} from "next";
import React from 'react';

export const metadata: Metadata = {
    title: "Servidor",
    robots: {
        index: false,
        follow: false,
    },
}

export default function ServerManageLayout({children}: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}