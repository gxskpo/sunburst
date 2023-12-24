import type {Metadata} from 'next'
import './globals.css'
import {SpeedInsights} from "@vercel/speed-insights/next"

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
        </head>
        <body>
        {children}
        <SpeedInsights/>
        </body>
        </html>
    )
}
