use dotenv::dotenv;
use poise::serenity_prelude::{ClientBuilder, GatewayIntents};
mod modules;
mod utils;
use openai::set_key;
use std::env;

use crate::modules::{errors, events, get_commands};

struct Data {}
type Error = Box<dyn std::error::Error + Send + Sync>;
type Context<'a> = poise::Context<'a, Data, Error>;

#[tokio::main]
async fn main() {
    dotenv().ok();

    set_key(env::var("OPENAI_KEY").expect("missing OPENAI_KEY"));
    let token = env::var("DISCORD_TOKEN").expect("missing DISCORD_TOKEN");
    let intents = GatewayIntents::all();
    let framework = poise::Framework::builder()
        .options(poise::FrameworkOptions {
            on_error: |e| Box::pin(errors::handle(e)),
            event_handler: |_ctx, event, _framework, _data| Box::pin(events::handler(event)),
            prefix_options: poise::PrefixFrameworkOptions {
                prefix: Some("$".into()),
                ..Default::default()
            },
            commands: get_commands(),
            ..Default::default()
        })
        .setup(|ctx, _ready, framework| {
            Box::pin(async move {
                poise::builtins::register_globally(ctx, &framework.options().commands).await?;
                Ok(Data {})
            })
        })
        .build();

    let client = ClientBuilder::new(token, intents)
        .framework(framework)
        .await;
    client.unwrap().start().await.unwrap();
}
