use crate::{Context, Error};
use poise::serenity_prelude::CreateEmbed;
use poise::CreateReply;
use std::time::SystemTime;

#[poise::command(prefix_command, slash_command)]
pub async fn ping(ctx: Context<'_>) -> Result<(), Error> {
    let now = SystemTime::now();
    let initial_embed = CreateEmbed::default()
        .title("Latency")
        .field("API", "<a:loading:1123453588136530043>", false)
        .field("Shard", "<a:loading:1123453588136530043>", false)
        .field("Database", "N/A", false);

    let message = ctx
        .send(CreateReply::default().embed(initial_embed))
        .await?;
    let elapsed = now.elapsed()?;
    let manager = ctx.framework().shard_manager();
    let runners = manager.runners.lock().await;
    let runner = match runners.get(&ctx.serenity_context().shard_id) {
        Some(runner) => runner,
        None => {
            ctx.say("No shard found").await?;
            return Ok(());
        }
    };

    let latency = runner.latency;
    let mut embed = CreateEmbed::default().title("Latency").field(
        "API",
        format!("`{:?}`ms", elapsed.as_millis()),
        false,
    );

    if let Some(latency) = latency {
        embed = embed.field("Shard", format!("`{:?}`ms", latency.as_millis()), false);
    }

    let reply = CreateReply::default().embed(embed);
    message.edit(ctx, reply).await?;
    return Ok(());
}
