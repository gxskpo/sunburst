use crate::{Data, Error};
use poise::serenity_prelude::CreateEmbed;
use poise::structs::FrameworkError;
use poise::CreateReply;

pub async fn handle(e: FrameworkError<'_, Data, Error>) {
    match e {
        FrameworkError::MissingUserPermissions {
            missing_permissions,
            ctx,
            ..
        } => {
            let text = format!(
                "{:?}",
                missing_permissions
                    .unwrap()
                    .get_permission_names()
                    .join(", ")
            );
            let embed = CreateEmbed::default().title("Oops!")
                .description(format!("You don't have enough permissions to use this command, missing permissions: ```{text}```"));
            let reply = CreateReply::default().embed(embed);
            let _ = ctx.send(reply).await;
        }
        FrameworkError::SubcommandRequired { ctx } => {
            let embed = CreateEmbed::default()
                .title("Oops!")
                .description("This commands need to be executed with a subcommand");

            let reply = CreateReply::default().embed(embed);
            let _ = ctx.send(reply).await;
        }
        FrameworkError::GuildOnly { ctx, .. } => {
            let embed = CreateEmbed::default()
                .title("Oops")
                .description("You need to be in a guild to use this command.");
            let reply = CreateReply::default().embed(embed);
            let _ = ctx.send(reply).await;
        }
        _ => (),
    }
}
