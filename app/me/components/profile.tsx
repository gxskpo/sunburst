"use client";
import {useState, useEffect} from "react";
import ProfileStats from "./stats";
import styles from '../MeStyle.module.css';
import {ProfileSkeleton, UsernameSkeleton} from "./skeletons";
import {logout, getUserData} from './serverUtils'
import {useRouter} from "next/navigation";

// @ts-ignore
export default function Profile() {
    const router = useRouter();
    const [user, setUser]: any = useState(null);


    useEffect(() => {
        getUserData().then((data) => {
            if (!data) {
                return logout().then(() => {
                    router.push("/auth/login");
                });
            }
            setUser(data);
        });
    }, []);


    return (
        <div className={styles.profile}>
            <div className={styles.profilePictureContainer}>
                {user && user.avatar && <img
                    src={user.avatar}
                    alt="Profile Picture"
                    className={styles.profilePictureImg}
                /> || <ProfileSkeleton/>
                }
            </div>
            <div className={styles.profileHeader}>
                <div className={styles.profileAccount}>
                    {user && user.username &&
                        <h4 className={styles.profileUsername}>{user.global_name}</h4>
                        || <UsernameSkeleton/>
                    }
                </div>
                <div className={styles.profileEdit}>
                    <a className={styles.profileButton} href="/settings">Configuración</a>
                </div>
            </div>
            <ProfileStats discordUser={user}/>
        </div>
    )
}