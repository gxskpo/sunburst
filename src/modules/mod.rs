use crate::{Data, Error};
use poise::Command;

mod info;

pub fn get_commands() -> Vec<Command<Data, Error>>{
    return vec![info::ping()];
}