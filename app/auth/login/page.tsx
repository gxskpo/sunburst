'use client';
import {redirect} from "next/navigation";
import styles from './flogin.module.css'
import getOauthURL from "./oauth_url";
import {useRouter} from "next/navigation";

export default function Login() {
    const router = useRouter();
    return (
        <>
            <div className={styles.loginContainer}>
                <div className={styles.loginForm}>
                    <h1 className={styles.loginFormTitle}>To continue please</h1>
                    <p className={styles.loginFormText}>Login with Discord</p>
                    <button
                        className={styles.loginFormButton}
                        onClick={async () => {
                            const redirectUrl: string = await getOauthURL();
                            if(redirectUrl) {
                                router.push(redirectUrl)
                            }
                        }}>
                        <i className={styles.loginFormButtonIcon + " fab fa-discord"}></i> Continue
                    </button>
                    <p className={styles.loginFormBottomText}>Your data will not be stored by Fembot</p>
                </div>
            </div>
        </>
    );
}