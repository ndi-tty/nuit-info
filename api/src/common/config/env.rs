#[derive(Debug)]
pub struct AppEnvironment {
    /// The address to listen on
    pub address: String,

    /// The port to listen on
    pub port: u16,

    /// The sqlite database url to use
    pub database_url: String,
}
