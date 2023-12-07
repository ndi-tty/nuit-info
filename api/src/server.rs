use crate::{domains::{health::controller::health_check, questions::handlers, scoreboard::handlers::{get_last_ten_scores_handler, create_score_handler}}, common::{state::app_state::AppState, config::args::CliArguments}};
use askama::Result;
use axum::{
    routing::{delete, get, post, put},
    Router, Server,
};
use clap::Parser;
use sqlx::{migrate::MigrateDatabase, sqlite::SqlitePoolOptions, Sqlite};
use std::net::SocketAddr;
use tracing::event;

pub fn create_router(app_state: AppState) -> Router {
    let router = Router::new();

    let misc = Router::new().route("/health", get(health_check));

    router
        .route("/questions", post(handlers::create_question_handler))
        .route("/questions/random", get(handlers::get_random_question_handler))
        .route("/questions/:question_id/answer", put(handlers::increment_answer_count_handler))
        .route("/scores", post(create_score_handler))
        .route("/scores", get(get_last_ten_scores_handler))
        .nest_service("/", misc)
        .with_state(app_state)
}

pub async fn bootstrap() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let args = CliArguments::parse();

    tracing_subscriber::fmt::init();

    // create database if it does not exist
    if !Sqlite::database_exists(&args.database_url).await? {
        event!(
            tracing::Level::INFO,
            "database {} does not exist, creating it...",
            args.database_url
        );
        match Sqlite::create_database(&args.database_url).await {
            Ok(_) => {
                event!(
                    tracing::Level::INFO,
                    "created database at {}",
                    args.database_url
                );
            }
            Err(e) => Err(e)?,
        }
    }

    // connect to database
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(&args.database_url)
        .await?;
    event!(
        tracing::Level::INFO,
        "successfully connected to {}",
        args.database_url
    );

    // run migrations
    sqlx::migrate!("./migrations").run(&pool).await?;

    let app_state = AppState::new(pool);
    let app = create_router(app_state);

    event!(
        tracing::Level::INFO,
        "starting server on {}:{}",
        args.address,
        args.port
    );

    // start server
    let socker_addr: SocketAddr = format!("{}:{}", args.address, args.port).parse()?;
    Server::bind(&socker_addr)
        .serve(app.into_make_service())
        .await?;

    Ok(())
}
