pub type SiloResult<T> = std::result::Result<T, SiloError>;

#[derive(Debug, thiserror::Error)]
pub enum SiloError {
    #[error("IO Error: {0}")]
    IO(#[from] std::io::Error),
}
