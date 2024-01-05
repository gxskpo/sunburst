import {Metadata} from "next";
import React from 'react';
import TopBar from "./components/topBar";
import {Providers} from "./components/contextProviders";
import './dash-gl.css'

export const metadata: Metadata = {
    title: {
        template: "%s | Dashboard",
        default: "Dashboard",
    },
    robots: {
        index: false,
        follow: false,
    },
}



export default function DashLayout({children}: { children: React.ReactNode }) {
    return (
        <div>
            <Providers>
                <TopBar/>
                <div className="dash-layout">
                    {children}
                </div>
            </Providers>
        </div>
    )
}