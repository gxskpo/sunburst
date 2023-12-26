"use client";
import {useEffect} from "react";

export function dispatchNotification(icon: string, title: string, body: string, buttonName?: string | null): Promise<void> {
    const nfwContainer = document.getElementById("nfw-container");
    const nfwContentHeader = document.getElementById("nfw-content-header-title");
    const nfwIcon = document.getElementById("nfw-icon");
    const nfwContentBody = document.getElementById("nfw-content-body-text");
    const nfwButton = document.getElementById("nfw-close-button");
    if (nfwContainer) {
        nfwIcon!.className = icon;
        nfwContentHeader!.textContent = title;
        nfwContentBody!.textContent = body;
        nfwContainer.style.display = "flex";
    }

    if (buttonName) {
        nfwButton!.textContent = buttonName;
    }

    return new Promise<void>((resolve) => {
        if (nfwButton) {
            nfwButton.addEventListener("click", () => {
                resolve();
            })
        }
    });
}


export function NotificationWidget(): JSX.Element {
    const closeThis = () => {
        const nfwContainer = document.getElementById("nfw-container");
        if (nfwContainer) {
            nfwContainer.style.display = "none";
        }
    }


    useEffect(() => {
        const cookiesAccepted: boolean = localStorage.getItem("cookiesAccepted") === "true";
        if (!cookiesAccepted) {
            dispatchNotification(
                'fas fa-cookie-bite',
                'Cookies',
                'Este sitio web utiliza cookies para mejorar su experiencia. Al continuar usando este sitio web, usted acepta el uso de cookies.'
            ).then(() => {
                localStorage.setItem("cookiesAccepted", "true");
            });
        }


    }, []);

    return (
        <div className="nfw-container" id="nfw-container">
            <div className={"nfw-content"}>
                <div className={"nfw-content-header"}>
                    <i id="nfw-icon"/> <h3 id={"nfw-content-header-title"}>¡Hola!</h3>
                </div>
                <div className={"nfw-content-body"}>
                    <p id={"nfw-content-body-text"}>Esta es una versión de prueba de Fembot, por lo
                        que puede que
                        encuentres errores, si encuentras
                        alguno, por favor, reportalo en nuestro servidor de soporte.</p>
                </div>
                <div className={"nfw-content-footer"}>
                    <button className={"nfw-content-footer-button"} onClick={closeThis}
                            id="nfw-close-button"> Entendido
                    </button>
                </div>
            </div>
        </div>
    )
}