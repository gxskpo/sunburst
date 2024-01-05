'use client';
import styles from '../LoginForm.module.css'
import getOauthURL from "./oauth_url";
import {useRouter} from "next/navigation";

export default function Login() {
    const router = useRouter();
    return (
        <>
            <div className={styles.loginContainer}>
                <div className={styles.loginForm}>
                    <h1 className={styles.loginFormTitle}>Para continuar</h1>
                    <p className={styles.loginFormText}>Inicie sesión con Discord</p>
                    <button
                        className={styles.loginFormButton}
                        onClick={async () => {
                            const redirectUrl: string = await getOauthURL();
                            if(redirectUrl) {
                                router.push(redirectUrl)
                            }
                        }}>
                        <i className={styles.loginFormButtonIcon + " fab fa-discord"}></i> Continuar
                    </button>
                    <p className={styles.loginFormBottomText}>Tus datos de sesión no serán almacenados en nuestro servidor</p>
                </div>
            </div>
        </>
    );
}