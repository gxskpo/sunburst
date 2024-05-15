use crate::{Context, Data, Error};
use poise::serenity_prelude::{CreateEmbed, Guild, User};
use poise::{Command, CreateReply};

/// Ban someone
#[poise::command(slash_command, prefix_command, required_permissions = "BAN_MEMBERS")]
async fn ban(
    ctx: Context<'_>,
    #[description = "User to ban"] user: User,
    #[description = "Reason"] reason: Option<String>,
) -> Result<(), Error> {
    let Some(guild_id) = ctx.guild_id() else {
        panic!("You are not in a guild");
    };

    let guild = Guild::get(ctx.http(), guild_id).await?;

    let r = format!(
        "Banned by {}, With Reason:{}",
        ctx.author().name,
        reason.unwrap_or("Not specified".to_owned())
    );

    guild.ban_with_reason(ctx.http(), user, 7, r).await?;

    let embed = CreateEmbed::default().title("Baneado");

    let reply = CreateReply::default().embed(embed);

    ctx.send(reply).await?;

    Ok(())
}

pub fn commands() -> Vec<Command<Data, Error>> {
    vec![ban()]
}
