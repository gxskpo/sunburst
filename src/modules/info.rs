use crate::utils;
use crate::{Context, Data, Error};
use poise::serenity_prelude::{CreateEmbed, CreateEmbedAuthor, Guild, Http, Mentionable, User};
use poise::{Command, CreateReply};
use std::time::SystemTime;

/// Get bot's latency
#[poise::command(prefix_command, slash_command)]
async fn ping(ctx: Context<'_>) -> Result<(), Error> {
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

/// Get information about a member
#[poise::command(prefix_command, slash_command)]
async fn user(
    ctx: Context<'_>,
    #[description = "User to get info about"] user: Option<User>,
) -> Result<(), Error> {
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

    let joined = format!(
        "
        **Discord**: <t:{}:R>
        ",
        member.created_at().unix_timestamp()
    );

    let mut embed = CreateEmbed::default()
        .description(format!("<@{}>", member.id))
        .thumbnail(&avatar)
        .author(CreateEmbedAuthor::new(&member.name).icon_url(&avatar))
        .field("Information", user_info, true)
        .field("Joined", joined, true);

    if let Some(guild_id) = ctx.guild_id() {
        let guild = Guild::get(ctx.http(), guild_id).await?;
        let m = guild.member(ctx.http(), member.id).await?;
        let roles: Vec<String> = m.roles.iter().map(|&r| r.mention().to_string()).collect();
        let detail = format!("**Roles**: `@everyone` {}", &roles.join(" "));
        embed = embed.field("Guild", detail, false);
    }

    ctx.send(CreateReply::default().embed(embed)).await?;

    Ok(())
}

/// Get information about the server
#[poise::command(prefix_command, slash_command)]
async fn server(ctx: Context<'_>) -> Result<(), Error> {
    let Some(guild_id) = ctx.guild_id() else {
        panic!("You are not in a guild");
    };

    let guild = Http::get_guild_with_counts(ctx.http(), guild_id).await?;

    let created_at = utils::snowflake::time(guild_id.into());

    let guild_icon = guild
        .icon_url()
        .unwrap_or("https://hwrk.lol/sunburst/assets/default-icon.jpg".to_owned());

    let information = format!(
        "
        Created: <t:{}:R>
        Id: `{}`
        Owner: <@{}>
        Shard: {}
        Nitro Tier: {:?}
       ",
        created_at,
        guild_id,
        guild.owner_id,
        guild.shard_id(ctx.cache()),
        guild.premium_tier
    );

    let count = format!(
        "
```py\n
Boosts: {}
Members: {}
Presences: {}
Roles: {}
```
        ",
        guild.premium_subscription_count.unwrap(),
        guild.approximate_member_count.unwrap(),
        guild.approximate_presence_count.unwrap(),
        guild.roles.len()
    );

    let embed = CreateEmbed::default()
        .author(CreateEmbedAuthor::new(guild.name).icon_url(&guild_icon))
        .field("Information", information, true)
        .field("Counts", count, true)
        .image(&guild_icon);

    ctx.send(CreateReply::default().embed(embed)).await?;

    Ok(())
}

pub fn commands() -> Vec<Command<Data, Error>> {
    vec![ping(), user(), server()]
}
