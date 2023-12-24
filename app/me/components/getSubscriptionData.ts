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

export async function getPanelUrl() {
}