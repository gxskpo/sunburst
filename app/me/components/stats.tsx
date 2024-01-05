"use client";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import styles from '../MeStyle.module.css';
import {SubFieldSkeleton} from "./skeletons";
import {getSubscriptionData, getPanelUrl, logout} from "./serverUtils";
import {dispatchNotification} from "@/app/nfWidget";


// @ts-ignore
export default function ProfileStats({discordUser}) {
    const [subscription, setSubscriptions]: [string, any] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (!discordUser || !discordUser.id) {
            return; // Si discordUser o su id es nulo, no hagas nada aún
        }

        getSubscriptionData(discordUser.id).then((data) => {
            setSubscriptions(data);
        });
    }, [discordUser]); // Agrega discordUser como dependencia
    const manageSubs = async () => {
        dispatchNotification("fas fa-circle-notch fa-spin", "Redirigiendo", "Estamos redirigiendote a tu panel de suscripciones");
        const panel_url = await getPanelUrl(discordUser.id);
        router.push(panel_url);
    }

    return (
        <div className={styles.profileStats}>
            <div className={styles.profileStat} onClick={manageSubs}>
                <div className={styles.profileIcon + " " + styles.profileIconBlue}>
                    <i className="fas fa-heart"></i>
                </div>
                {subscription &&
                    <div className={styles.profileValue}>{subscription}</div> ||
                    <SubFieldSkeleton/>
                }
                <div className={styles.profileKey}>Subscriber</div>
            </div>
            <div className={styles.profileStat} onClick={() => {
                logout().then((completed: boolean) => {
                    if (completed) {
                        router.push("/");
                    }
                });
            }}>
                <div className={styles.profileIcon + " " + styles.profileIconPink}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                </div>
                <div className={styles.profileValue} style={{
                    fontSize: "1.5rem"
                }}>Cerrar sesión
                </div>
            </div>
        </div>

    )
}