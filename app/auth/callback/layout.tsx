import {Metadata} from 'next';
import React from "react";


export const metadata: Metadata = {
    title: 'Por favor espere | Fembot',
};

export default function TKELayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <body>{children}</body>
        </html>
    )
}