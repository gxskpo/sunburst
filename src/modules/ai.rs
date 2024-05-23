use crate::utils;
use crate::{Context, Data, Error};
use poise::Command;

#[poise::command(slash_command, prefix_command)]
pub async fn ask(_ctx: Context<'_>) -> Result<(), Error> {
    Ok(())
}

#[poise::command(slash_command, prefix_command)]
pub async fn imagine(_ctx: Context<'_>) -> Result<(), Error> {
    Ok(())
}

pub fn commands() -> Vec<Command<Data, Error>> {
    vec![]
}
