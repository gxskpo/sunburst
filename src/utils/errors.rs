use std::fmt;

#[allow(dead_code)]
#[derive(Debug)]
pub enum SunburstError {
    Arguments,
    NotInGuild,
}

impl fmt::Display for SunburstError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Self::Arguments => write!(f, "Some argument recieved an invalid input."),
            Self::NotInGuild => write!(f, "This command must be invoked in a guild"),
        }
    }
}
impl std::error::Error for SunburstError {}
unsafe impl Send for SunburstError {}
unsafe impl Sync for SunburstError {}
