"use client";
import {useState, useEffect, Suspense} from "react";
import getUserData from "./getUserData";
import ProfileStats from "./stats";
import styles from '../mestyles.module.css';
import {ProfileSkeleton, UsernameSkeleton} from "./skeletons";
import Logout from "@/app/me/components/logout";

// @ts-ignore
export default function Profile({router}) {
    const [user, setUser]: any = useState(null);

    useEffect(() => {
        getUserData().then((data) => {
            if (!data) {
                return Logout().then((completed: boolean) => {
                    router.push("/auth/login");
                });
            }
            console.log(data);
            setUser(data);
        });
    }, []);

    return (
        <div className={styles.profile}>
            <Suspense fallback={<ProfileSkeleton/>}>
                <div className={styles.profilePictureContainer}>
                    {user && user.avatar &&
                        <img
                            src={user.avatar}
                            alt="Profile Picture"
                            className={styles.profilePictureImg}
                        /> || <ProfileSkeleton/>
                    }
                </div>
            </Suspense>
            <div className={styles.profileHeader}>
                <div className={styles.profileAccount}>
                    {user && user.username &&
                        <h4 className={styles.profileUsername}>{user.username}</h4>
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