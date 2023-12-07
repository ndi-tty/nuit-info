use sqlx::{Pool, Sqlite};

#[derive(Clone, Debug)]
pub struct AppState {
    pub db: Pool<Sqlite>,
}

impl AppState {
    pub fn new(db: Pool<Sqlite>) -> Self {
        Self { db }
    }
}
