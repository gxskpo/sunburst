import {Metadata} from 'next';
import React from "react";


export const metadata: Metadata = {
    title: 'Iniciar sesión | Fembot',
    description: 'Inciar sesión en Fembot',
};

export default function LoginLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <body>{children}</body>
        </html>
    )
}