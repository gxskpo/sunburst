use crate::{Data, Error};
use poise::Command;

pub mod errors;
pub mod events;
mod info;
mod moderation;

macro_rules! merge_vecs {
    ($($vec:expr),*) => {{
        let mut merged_vec = Vec::new();
        $(
            merged_vec.extend($vec);
        )*
        merged_vec
    }};
}

pub fn get_commands() -> Vec<Command<Data, Error>> {
    merge_vecs!(info::commands(), moderation::commands())
}
