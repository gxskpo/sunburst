use crate::{Context, Error};
use poise::serenity_prelude::{CreateEmbed, CreateEmbedAuthor, Guild, Mentionable, User};
use poise::CreateReply;
use std::time::SystemTime;

#[poise::command(prefix_command, slash_command)]
pub async fn ping(ctx: Context<'_>) -> Result<(), Error> {
    let now = SystemTime::now;
    let initial_embed = CreateEmbed::default()
        .title("Latency")
        .field("API", "<a:loading:1123453588136530043>", false)
        .field("Shard", "<a:loading:1123453588136530043>", false)
        .field("Database", "N/A", false);

    let message = ctx
        .send(CreateReply::default().embed(initial_embed))
        .await?;
    let elapsed = now().elapsed()?;
    let manager = ctx.framework().shard_manager();
    let runners = manager.runners.lock().await;

    let Some(runner) = runners.get(&ctx.serenity_context().shard_id) else {
        panic!("Shard don't found!");
    };

    let embed = match runner.latency {
        Some(latency) => CreateEmbed::default()
            .title("Latency")
            .field("API", format!("`{:?}ms`", elapsed.as_millis()), false)
            .field("Gateway", format!("`{:?}ms`", latency.as_millis()), false),
        None => CreateEmbed::default().title("Latency").field(
            "API",
            format!("`{:?}ms`", elapsed.as_millis()),
            false,
        ),
    };

    let reply = CreateReply::default().embed(embed);
    message.edit(ctx, reply).await?;

    Ok(())
}

#[poise::command(prefix_command, slash_command)]
pub async fn user(ctx: Context<'_>, user: Option<User>) -> Result<(), Error> {
    let member = user.as_ref().unwrap_or_else(|| ctx.author());

    let avatar = match member.avatar_url() {
        Some(avatar) => avatar,
        None => String::from("https://hwrk.lol/sunburst/assets/default-avatar.jpg"),
    };

    let user_info = format!(
        "
        **Bot**: `{}`
        **Id**:  `{}`
        ",
        member.bot, member.id
    );

    let banner = match member.banner_url() {
        Some(banner) => banner,
        None => String::new(),
    };

    let mut embed = CreateEmbed::default()
        .description(format!("<@{}>", member.id))
        .thumbnail(&avatar)
        .author(CreateEmbedAuthor::new(&member.name).icon_url(&avatar))
        .image(banner)
        .field("Information", user_info, true);

    if ctx.guild_id().is_some() {
        let guild_id = ctx.guild_id().unwrap();

        let guild = Guild::get(ctx.http(), guild_id).await?;
        let m = guild.member(ctx.http(), member.id).await?;

        let roles: Vec<String> = m.roles.iter().map(|&r| r.mention().to_string()).collect();
        let detail = format!("**Roles**: `@everyone` {}", &roles.join(" "));

        embed = embed.field("Guild", detail, false);
    }

    ctx.send(CreateReply::default().embed(embed)).await?;

    Ok(())
}
