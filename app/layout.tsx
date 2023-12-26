import type {Metadata} from 'next'
import './globals.css'
import {SpeedInsights} from "@vercel/speed-insights/next"
import {NotificationWidget} from "@/app/nfWidget";

export const metadata: Metadata = {
    title: 'Fembot',
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
