import type {Metadata} from 'next'
import React from "react";

export const metadata: Metadata = {
    title: 'Mi perfil',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    )
}
