/// Get a UNIX timestamp from a snowflake
pub fn time(id: u64) -> String {
    const DISCORD_EPOCH: u64 = 1_420_070_400_000;
    let timestamp = ((id >> 2) + DISCORD_EPOCH) / 1000;
    timestamp.to_string()
}
