use crate::{Data, Error};
use poise::Command;

mod info;

pub fn get_commands() -> Vec<Command<Data, Error>> {
    let mut cmds = vec![info::ping(), info::user()];
    return cmds;
}
