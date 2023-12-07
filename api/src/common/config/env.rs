use clap::Parser;

#[command(author, version, about, long_about = None)]
pub struct CliArguments {
    /// The address to listen on
    #[clap(short, long, default_value = "0.0.0.0")]
    pub address: String,

    /// The port to listen on
    #[clap(short, long, default_value = "3000")]
    pub port: u16,

    /// The sqlite database url to use
    #[clap(short, long, default_value = "sqlite:counter.db")]
    pub database_url: String,
}
