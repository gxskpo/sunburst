"use client";
import Profile from "./components/profile";
import ProfileStats from "./components/stats";
import {useRouter} from "next/navigation";

export default function MePage() {
    const router = useRouter();
    return (
        <Profile router={router} />
    )
}