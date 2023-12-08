pub mod common;
pub mod domains;

mod server;
use std::process::exit;

use octocrab::{Octocrab, params::apps::CreateInstallationAccessToken, models::InstallationToken};
use server::bootstrap;
use tracing::event;

#[tokio::main]
async fn main() {
    if let Err(e) = bootstrap().await {
        event!(tracing::Level::ERROR, "{}", e);
        std::process::exit(1);
    }
}
