import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Cargando...',
}

export default function CallbackLayout({children}: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}