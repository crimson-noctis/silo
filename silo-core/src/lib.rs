pub mod embeddings;
pub mod error;
pub mod ingestion;
pub mod search;
pub mod vector_store;

pub fn hello_core() -> String {
    format!("CONNECTED TO SILO CORE")
}
