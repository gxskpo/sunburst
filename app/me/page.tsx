"use client";
import Profile from "./components/profile";
import styles from './MeStyle.module.css';
import {useRouter} from "next/navigation";


export default function MePage() {
    const router = useRouter();
    const goHome = () => {
        router.push("/")
    }

    return (
        <div className={styles.layout}>
            <div className={styles.topContainer}>
                <button className={styles.topBubbleButton} onClick={goHome}><i className="fas fa-house"/> <p>Inicio</p></button>
            </div>
            <Profile />
        </div>
    )
}