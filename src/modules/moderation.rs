use crate::utils::errors::SunburstError;
use crate::utils::parse;
use crate::{Context, Data, Error};
use poise::serenity_prelude::{CreateEmbed, Guild, Member, Mentionable, User};
use poise::{Command, CreateReply};

/// Ban someone
#[poise::command(
    slash_command,
    prefix_command,
    required_permissions = "BAN_MEMBERS",
    guild_only
)]
async fn ban(
    ctx: Context<'_>,
    #[description = "User to ban"] user: User,
    #[description = "Reason"] reason: Option<String>,
) -> Result<(), Error> {
    let guild_id = ctx.guild_id().unwrap();
    let guild = Guild::get(ctx.http(), guild_id).await?;
    let r = format!(
        "Banned by {} | Reason:{}",
        ctx.author().name,
        reason.unwrap_or("Not specified".to_owned())
    );
    guild.ban_with_reason(ctx.http(), user, 7, r).await?;
    let embed = CreateEmbed::default().title("Baneado");
    let reply = CreateReply::default().embed(embed);
    ctx.send(reply).await?;

    Ok(())
}

/// Unban an user
#[poise::command(
    slash_command,
    prefix_command,
    required_permissions = "BAN_MEMBERS",
    guild_only
)]
async fn unban(ctx: Context<'_>, #[description = "User to unban"] user: User) -> Result<(), Error> {
    let guild_id = ctx.guild_id().unwrap();
    let guild = Guild::get(ctx.http(), guild_id).await?;

    guild.unban(ctx.http(), user.id).await?;

    let embed = CreateEmbed::default()
        .title("Unbanned")
        .description(format!("{} was unbanned.", user.mention()));

    let reply = CreateReply::default().embed(embed);
    ctx.send(reply).await?;
    Ok(())
}

/// Mute a member
#[poise::command(
    slash_command,
    prefix_command,
    required_permissions = "MODERATE_MEMBERS",
    guild_only
)]
async fn mute(
    ctx: Context<'_>,
    #[description = "Member"] member: Member,
    #[description = "Duration"] duration: String,
) -> Result<(), Error> {
    let guild_id = ctx.guild_id().unwrap();
    let guild = Guild::get(ctx.http(), guild_id).await?;

    let Ok(time) = parse::human_time(&duration) else {
        // TODO: Add custom error.
        // panic!("AAAAA")
        return Err(Box::new(SunburstError::ArgumentError));
    };

    let mut m = guild.member(ctx.http(), member.user.id).await?;

    m.disable_communication_until_datetime(ctx.http(), time)
        .await?;

    Ok(())
}

pub fn commands() -> Vec<Command<Data, Error>> {
    vec![ban(), unban(), mute()]
}
