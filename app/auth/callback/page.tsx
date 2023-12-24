'use client';
import styles from './flogin.module.css'
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
        console.log(code)
        if (!code) {
            router.push("/auth/login")
        }
        const plainCode = decodeURIComponent(code)
        exchangeToken(plainCode).then((completed)=> {
            if (completed) {
                router.push("/me")
            }
        })

    }, [code])

    return (
        <>
            <div className={styles.loginContainer}>
                <div className={styles.loginForm}>
                    <h1 className={styles.loginFormTitle}>Por favor espere</h1>
                    {/*Bolita que rebote*/}
                    <i className={"fas fa-circle fa-bounce fa-2x " + styles.loginFormButtonIcon}></i>
                    <p className={styles.loginFormBottomText}>Esto puede tardar unos segundos</p>
                </div>
            </div>
        </>
    );
}