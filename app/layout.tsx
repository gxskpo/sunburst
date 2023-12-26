import type {Metadata} from 'next'
import './globals.css'
import {SpeedInsights} from "@vercel/speed-insights/next"
import {NotificationWidget} from "@/app/nfWidget";

export const metadata: Metadata = {
    title: 'SunBurst',
    description: 'SunBurst, el mejor bot de discord en español',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
        <head>
            {/* @ts-ignore */}
            <title>{metadata.title}</title>
            {/* @ts-ignore */}
            <meta name="description" content={metadata.description}/>
            <meta property="og:title" content="SunBurst | Bot de Discord"/>
            <meta property="og:type" content="website"/>
            <meta property="og:description" content="SunBurts, el mejor bot de discord en español"/>
            <meta property="og:image" content="/sunburst-banner.png"/>
            <meta name="theme-color" content="#5d35a4"/>
            <script src={"https://kit.fontawesome.com/8e4c18f6c2.js"} crossOrigin="anonymous"></script>
            <script defer src="https://overtracking.com/p/KXWaXiao8mO7ovqA"></script>
        </head>
        <body>
        <NotificationWidget/>
        {children}
        <SpeedInsights/>
        </body>
        </html>
    )
}
