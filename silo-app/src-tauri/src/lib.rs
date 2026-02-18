use silo_core;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn create_qdrant_collection() -> String {
    let _ = silo_core::vector_store::qdrant::setup_qdrant()
        .await
        .unwrap();

    format!("Successfully Created Qdrant Collection")
}

#[tauri::command]
async fn search_qdrant_collection() -> Result<String, String> {
    let result = silo_core::vector_store::qdrant::search_collection()
        .await
        .map_err(|e| e.to_string());

    Ok(format!(
        "Successfully Searched Qdrant Collection with Results: {:?}",
        result
    ))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            create_qdrant_collection,
            search_qdrant_collection
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
