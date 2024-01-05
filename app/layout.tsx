import type {Metadata} from 'next'
import './globals.css'
import {SpeedInsights} from "@vercel/speed-insights/next"
import {Analytics} from '@vercel/analytics/react';
import {NotificationWidget} from "@/app/nfWidget";
import React from "react";

export const metadata: Metadata = {
    title: {
        template: '%s | SunBurst',
        default: 'SunBurst',
    },
    description: 'SunBurst, el mejor bot de discord en español',
    keywords: ['SunBurst', 'discord', 'bot', 'discord bot', 'discord.js', 'discord.py', 'discord bot español', 'discord bot es', 'top.gg', 'discords.com'],
    publisher: 'Galactiko',
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        url: 'https://beta.fembot.online',
        siteName: 'SunBurst',
        images: [
            {
                url: '/sunburst-banner.png',
                alt: 'SunBurst',
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
        <head>
            <script src={"https://kit.fontawesome.com/8e4c18f6c2.js"} crossOrigin="anonymous"></script>
            <script defer src="https://overtracking.com/p/KXWaXiao8mO7ovqA"></script>
            <script src="/a.js" defer></script>
        </head>
        <body>
        <NotificationWidget/>
        {children}
        <Analytics/>
        <SpeedInsights/>
        </body>
        </html>
    )
}
