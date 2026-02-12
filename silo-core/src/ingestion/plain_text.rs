use std::fs;

use crate::error::SiloResult;

pub fn parse_plain_text(file_path: &str) -> SiloResult<String> {
    let contents = fs::read_to_string(file_path)?;
    Ok(contents)
}
