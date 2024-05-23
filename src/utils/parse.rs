use poise::serenity_prelude::Timestamp;
use regex::Regex;
use std::error;
use std::time::{Duration, SystemTime};

pub fn human_time(human: &str) -> Result<Timestamp, Box<dyn error::Error>> {
    const PATTERN: &str = r"(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?";
    let re = Regex::new(PATTERN).unwrap();

    let Some(caps) = re.captures(human) else {
        let i: u64 = human.parse()?;
        let x = Duration::new(i, 0);
        let time = (SystemTime::now() + x)
            .duration_since(SystemTime::UNIX_EPOCH)?
            .as_secs();
        return Ok(Timestamp::from_unix_timestamp(time as i64)?);
    };

    let days: u32 = caps
        .get(1)
        .map_or(0, |m| m.as_str().parse().unwrap_or_default());
    let hours: u32 = caps
        .get(2)
        .map_or(0, |m| m.as_str().parse().unwrap_or_default());
    let minutes: u32 = caps
        .get(3)
        .map_or(0, |m| m.as_str().parse().unwrap_or_default());
    let seconds: u32 = caps
        .get(4)
        .map_or(0, |m| m.as_str().parse().unwrap_or_default());

    let r = (days * 86_400) + (hours * 3_600) + (minutes * 60) + seconds;
    let time = (SystemTime::now() + Duration::new(u64::from(r), 0))
        .duration_since(SystemTime::UNIX_EPOCH)?
        .as_secs();

    Ok(Timestamp::from_unix_timestamp(time as i64)?)
}
