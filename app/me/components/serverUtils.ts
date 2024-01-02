"use server";
import {cookies} from "next/headers";
import Stripe from "stripe";

export async function getSubscriptionData(discordId: string) {
    if (!discordId) return "Free";
    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
    const stripe = new Stripe(STRIPE_SECRET_KEY)

    const me = await stripe.customers.search({
        query: `metadata['discord_id']:'${discordId}'`
    })
    if (me.data && me.data.length > 0) {
        const subs = await stripe.subscriptions.list({
            customer: me.data[0].id
        })
        let response = []
        for (let i = 0; i < subs.data.length; i++) {
            // @ts-ignore
            const productData = await stripe.products.retrieve(subs.data[i].plan.product)
            response.push({
                'name': productData.name.split(' ')[1]
            })
        }
        return response[0]['name'];
    }
    return "Free";
}

export async function createCustomer(discordId: string, email: string) {
    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
    const stripe = new Stripe(STRIPE_SECRET_KEY)
    return await stripe.customers.create({
        metadata: {
            discord_id: discordId
        },
        email: email
    })

}

export async function getUserData() {
    const cookie = cookies().get("access_token");
    if (!cookie) return null;
    const res = await fetch("https://discord.com/api/users/@me", {
        headers: {
            "Authorization": `Bearer ${cookie.value}`
        }
    });
    if (!res.ok) return null;
    const data = await res.json();
    data.avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`;
    return data;

}

export async function logout(): Promise<boolean> {
    const refresh_token = cookies().get("refresh_token");
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET

    if (!refresh_token) {
        cookies().delete("access_token");
        cookies().delete("refresh_token");
        return true;
    }

    const body = {
        'client_id': clientId,
        'client_secret': clientSecret,
        'token': refresh_token.value,
        'token_type_hint': 'refresh_token',
    };
    const encodedBody = Object.keys(body)
        // @ts-ignore
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
        .join('&');
    const response = await fetch("https://discord.com/api/oauth2/token/revoke", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: encodedBody
    })
    if (!response.ok) throw new Error("Failed to revoke token");
    cookies().delete("refresh_token");
    cookies().delete("access_token");
    return true;
}

export async function getPanelUrl(userId: string) {
    const ENV = process.env.ENVRT;
    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
    const DOMAIN = process.env.DOMAIN!;
    const stripe = new Stripe(STRIPE_SECRET_KEY)
    let prefix = ENV === "production" ? "https://" : "http://";

    let session;
    const me = await stripe.customers.search({
        query: `metadata['discord_id']:'${userId}'`
    })
    if (me.data && me.data.length > 0) {
        session = await stripe.billingPortal.sessions.create({
            customer: me.data[0].id, return_url: prefix + DOMAIN + "/me"
        });
    } else {
        const mail = await getUserData();
        const cus = await createCustomer(userId, mail.email)
        session = await stripe.billingPortal.sessions.create({
            customer: cus.id, return_url: prefix + DOMAIN + "/me"
        });
    }
    return session.url;
}