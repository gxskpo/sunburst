"use client";
import styles from './Home.module.css'
import {getUserData} from "@/app/me/components/serverUtils";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const [user, setUser] = useState<any>(null)
    const router = useRouter();

    useEffect(() => {
        getUserData().then((data) => {
            if (data) {
                console.log(data);
                setUser(data)
            } else {
                setUser('loginRequired')
            }
        })
    }, [])

    const accountButtonAction = (): void => {
        router.push("/me")
    }

    const goAdd = (): void => {
        const url: string = "https://discord.com/api/oauth2/authorize?client_id=1084596791783194634&permissions=9897215552535&scope=bot+applications.commands"
        const wind = window.open(url, "_blank")
        wind?.focus()
    }

    const goVote = (): void => {
        const url: string = "https://top.gg/bot/1084596791783194634/vote"
        // const wind = window.open(url, "_blank")
        // wind?.focus()
        alert("Oops!, por ahora no se puede votar, estamos esperando a que top.gg apruebe el bot!")
    }
    // const aaa = (<i className="fas fa-user"/> Login)

    return (
        <div className={styles.container}>
            <div className={styles.landingContainer}>
                <div className={styles.topContainer}>
                    {user && user !== 'loginRequired' ?
                        <button className={styles.topBubbleButton} onClick={accountButtonAction}>
                            <img
                                src="https://cdn.discordapp.com/avatars/538821983606145044/8f1f80a0c3d1d37f4dfb009a94fe2ce2.png"
                                alt="user"/>
                            <p>{user.global_name}</p>
                        </button> : user === 'loginRequired' ?
                        <button className={styles.topBubbleButton} onClick={accountButtonAction}><i
                            className="fas fa-user"/> Login</button>:
                            <button className={styles.topBubbleButton + ' ' + styles.skeleton}>
                                <p className={styles.skeleton}></p>
                            </button>
                    }
                    {user && user !== 'loginRequired' ?
                        <button className={styles.topBubbleButton}><i className="fas fa-cog"/> <p>Dashboard</p>
                        </button> : user === 'loginRequired' ? null: null
                    }
                </div>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Fembot</h1>
                    <p className={styles.description}>Bot de discord completamente en español</p>
                    <span className={styles.buttonContainer}>
                    <button className={styles.landingButton + ' ' + styles.addDiscord} onClick={goAdd}><i
                        className="fab fa-discord"/>Invitar</button>
                    <button className={styles.landingButton + ' ' + styles.vote} onClick={goVote} disabled={true}><i
                        className="fas fa-check-to-slot"/> Votar</button>
                    </span>
                </div>
                <i className={styles.scrollDownIndicator + " fas fa-chevron-down"}/>
            </div>
        </div>
    )
}
