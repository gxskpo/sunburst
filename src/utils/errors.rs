use std::fmt;

#[allow(dead_code)]
#[derive(Debug)]
pub enum SunburstError {
    ArgumentError,
}

impl fmt::Display for SunburstError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            SunburstError::ArgumentError => write!(f, "Some argument recieved an invalid input."),
        }
    }
}
impl std::error::Error for SunburstError {}
unsafe impl Send for SunburstError {}
unsafe impl Sync for SunburstError {}
