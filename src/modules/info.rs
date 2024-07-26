use crate::utils;
use crate::utils::snowflake::default_avatar_url;
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
    let manager = ctx.framework().shard_manager();
    let runners = manager.runners.lock().await;

    let Some(runner) = runners.get(&ctx.serenity_context().shard_id) else {
        panic!("Shard don't found!");
    };

    let elapsed = now().elapsed()?;
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
    let member = user.as_ref().unwrap_or(ctx.author());
    let avatar = member.avatar_url().unwrap_or(default_avatar_url(member.id));

    let user_info = format!(
        "
        **Bot**: `{}`
        **Id**:  `{}`
        **Username**: {}
        ",
        member.bot, member.id, member.name,
    );

    let mut joined_server = String::new();
    if let Some(guild_id) = ctx.guild_id() {
        let guild = Http::get_guild_with_counts(ctx.http(), guild_id).await?;
        let guild_member = guild.member(ctx.http(), member.id).await?;
        joined_server = format!("**Server**: <t:{}:R>", guild_member.joined_at.unwrap());
    }

    let joined = format!(
        "
        **Discord**: <t:{}:R>
        {}
        ",
        member.created_at().unix_timestamp(),
        joined_server
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

#[poise::command(prefix_command, slash_command)]
async fn avatar(ctx: Context<'_>) -> Result<(), Error> {
    let author = ctx.author();
    let avatar = author
        .avatar_url()
        .unwrap_or(default_avatar_url(author.id.get()));

    let name = author.global_name.as_ref().unwrap_or(&author.name);

    let title = format!("{name}'s avatar");

    let embed = CreateEmbed::default().title(title).image(avatar);

    let reply = CreateReply::default().embed(embed);
    ctx.send(reply).await?;

    Ok(())
}

/// Get information about the server
#[poise::command(prefix_command, slash_command)]
async fn server(ctx: Context<'_>) -> Result<(), Error> {
    let Some(guild_id) = ctx.guild_id() else {
        panic!("You are not in a guild");
    };

    let guild = Http::get_guild_with_counts(ctx.http(), guild_id).await?;

    let created_at = utils::snowflake::time(guild_id);

    let premium_tier: u8 = guild.premium_tier.into();

    let information = format!(
        "
        Created: <t:{}:R>
        Id: `{}`
        Owner: <@{}>
        Shard: `{}`
        Nitro Tier: `Level {}`
       ",
        created_at,
        guild_id,
        guild.owner_id,
        guild.shard_id(ctx.cache()),
        premium_tier
    );

    let counts = format!(
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

    let mut embed = CreateEmbed::default()
        .field("Information", information, true)
        .field("Counts", counts, true);

    if let Some(icon) = guild.icon_url() {
        embed = embed.author(CreateEmbedAuthor::new(guild.name).icon_url(icon));
    }

    ctx.send(CreateReply::default().embed(embed)).await?;

    Ok(())
}

pub fn commands() -> Vec<Command<Data, Error>> {
    vec![ping(), user(), server(), avatar()]
}
