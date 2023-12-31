"use client";
import styles from './Home.module.css'
import {getUserData} from "./me/components/serverUtils";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {dispatchNotification} from "./nfWidget";
import ComparisonTable from "./comparisonTable";


interface User {
    id: string,
    avatar: string,
    global_name: string
    [key: string]: any
}
export default function Home() {
    const [user, setUser] = useState<User | any>(null)
    const router = useRouter();
    const APP_ID = process.env.NEXT_PUBLIC_CLIENT_ID

    useEffect(() => {
        getUserData().then((data) => {
            if (data) {
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
        const url: string = `https://discord.com/api/oauth2/authorize?client_id=${APP_ID}&permissions=9897215552535&scope=bot+applications.commands`
        dispatchNotification(
            'fas fa-wrench',
            'Aviso',
            'SunBurst está en fase de desarrollo, podrías encontrar errores'
        ).then(() => {
            const wind = window.open(url, "_blank")
            wind?.focus()
        })
    }

    const goVote = (): void => {
        // const url: string = `https://top.gg/bot/${APP_ID}/vote`
        // const wind = window.open(url, "_blank")
        // wind?.focus()
        dispatchNotification(
            'fas fa-bug',
            'Oops!',
            'Por el momento no puedes votar por SunBurst, estamos esperando a que nos aprueben en top.gg ^^'
        ).then(() => null);
    }

    return (
        <div className={styles.container}>
            <div className={styles.landingContainer} data-title="Inicio">
                <div className={styles.topContainer}>
                    {user && user !== 'loginRequired' ?
                        <button className={styles.topBubbleButton} onClick={accountButtonAction}>
                            <img
                                src={user.avatar}
                                alt="user"/>
                            <p>{user.global_name}</p>
                        </button> : user === 'loginRequired' ?
                            <button className={styles.topBubbleButton} onClick={accountButtonAction}><i
                                className="fas fa-user"/> Login</button> :
                            <button className={styles.topBubbleButton + ' ' + styles.skeleton}>
                                <p className={styles.skeleton}></p>
                            </button>
                    }
                    {user && user !== 'loginRequired' ?
                        <button className={styles.topBubbleButton} onClick={() => router.push("/dash")}><i className="fas fa-cog"/> <p>Dashboard</p>
                        </button> : user === 'loginRequired' ? null : null
                    }
                </div>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>SunBurst</h1>
                    <p className={styles.description}>Bot de discord completamente en español</p>
                    <span className={styles.buttonContainer}>
                    <button className={styles.landingButton + ' ' + styles.addDiscord} onClick={goAdd}><i
                        className="fab fa-discord"/>Invitar</button>
                    <button className={styles.landingButton + ' ' + styles.vote} onClick={goVote} disabled={false}><i
                        className="fas fa-check-to-slot"/> Votar</button>
                    </span>
                </div>
                <i className={styles.scrollDownIndicator + " fas fa-chevron-down"}/>
            </div>
            <div className={styles.whyWeAreBetterContainer} data-title="¿Por qué Fembot?">
                <h1 className={styles.whyWeAreBetterTitle}>¿Por qué SunBurst?</h1>
                <div className={styles.whyWeAreBetterCardsContainer}>
                    <div className={styles.whyWeAreBetterCard}>
                        <i className="fas fa-code"/>
                        <h2>Personalización</h2>
                        <p>Con Fembot puedes crear módulos y comandos personalizados facilmente.¹</p>
                    </div>
                    <div className={styles.whyWeAreBetterCard}>
                        <i className="fas fa-shield-alt"/>
                        <h2>Confiabilidad</h2>
                        <p>Nos esforzamos por cuidar cada detalle para que Fembot sea lo más confiable posible</p>
                    </div>
                    <div className={styles.whyWeAreBetterCard}>
                        <i className="fas fa-rocket"/>
                        <h2>Velocidad</h2>
                        <p>Utilizamos la infraestructura de Digital Ocean para garantizar la mejor velocidad de
                            respuesta</p>
                    </div>
                </div>
            </div>
            <div className={styles.moduleListContainer} data-title="Módulos">
                <h1 className={styles.moduleListTitle}>Módulos</h1>
                <p>Estos son algunos de los módulos que incluye SunBurst</p>
                <div className={styles.moduleList}>
                    <div className={styles.moduleCard} id="mod">
                        <i className="fas fa-user-shield"/>
                        <h2>Moderación</h2>
                    </div>
                    <div className={styles.moduleCard} id="role">
                        <i className="fas fa-theater-masks"/>
                        <h2>Rol</h2>
                    </div>
                    <div className={styles.moduleCard} id="pets">
                        <i className="fas fa-paw"/>
                        <h2>Mascotas</h2>
                    </div>
                    <div className={styles.moduleCard} id="emojis">
                        <i className="fas fa-grin"/>
                        <h2>Emojis</h2>
                    </div>
                    <div className={styles.moduleCard} id="giveaways">
                        <i className="fas fa-gift"/>
                        <h2>Sorteos</h2>
                    </div>
                    <div className={styles.moduleCard} id="ai">
                        <i className="fas fa-brain"/>
                        <h2>IA</h2>
                    </div>
                </div>
                <p>Y muchos más...</p>
            </div>
            <div className={styles.comparisonContainer} data-title="Comparación">
                <div className={styles.comparisonTableContainer}>
                    <h1 className={styles.comparisonTitle}>¿Aún no estás convencido?</h1>
                    <div className={styles.comparisonDescription}>Compara a <p
                        className={styles.fembot}>SunBurst</p> con
                        otros bots
                    </div>
                </div>
                <div className={styles.comparisonTableContainerContainer}>
                    <ComparisonTable/>
                </div>
            </div>
        </div>
    )
}
