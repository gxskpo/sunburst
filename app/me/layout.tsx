import type { Metadata } from 'next'
import styles from './mestyles.module.css';

export const metadata: Metadata = {
    title: 'Mi perfil',
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
        </head>
        <body>
        <div className={styles.layout}>
            {children}
        </div>
        </body>
        </html>
    )
}
