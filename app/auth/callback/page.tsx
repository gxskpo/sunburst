'use client';
import styles from '../LoginForm.module.css'
import exchangeToken from "./tokenExchange";
import {useRouter} from "next/navigation";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function ExchangeToken() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // @ts-ignore
    const code: string = searchParams.get('code');




    useEffect(() => {
        if (!code) {
            router.push("/auth/login")
        }
        const plainCode = decodeURIComponent(code)
        exchangeToken(plainCode).then((completed)=> {
            if (completed) {
                router.push("/me")
            }
        }).catch(() => {
            router.push("/auth/login")
        });
    }, [code])

    return (
        <>
            <div className={styles.loginContainer}>
                <div className={styles.loginForm}>
                    <h1 className={styles.loginFormTitle}>Por favor espere</h1>
                    <i className={"fas fa-circle fa-bounce fa-2x " + styles.loginFormIcon}></i>
                    <p className={styles.loginFormBottomText}>Esto puede tardar unos segundos</p>
                </div>
            </div>
        </>
    );
}