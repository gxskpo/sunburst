import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Iniciar sesión',
}

export default function Login({children}: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}