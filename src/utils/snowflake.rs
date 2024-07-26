/// Get a UNIX timestamp from a snowflake
pub fn time(id: impl Into<u64>) -> String {
    const DISCORD_EPOCH: u64 = 1_420_070_400_000;
    let snowflake: u64 = id.into();
    let timestamp = ((snowflake >> 22) + DISCORD_EPOCH) / 1000;
    timestamp.to_string()
}

/// Get user's default avatar url
pub fn default_avatar_url(user_id: impl Into<u64>) -> String {
    let id: u64 = user_id.into();
    let index = (id >> 22) % 6;
    format!("https://cdn.discordapp.com/embed/avatars/{index}.png")
}
