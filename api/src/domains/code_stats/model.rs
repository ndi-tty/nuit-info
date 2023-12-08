use serde::{Serialize, Deserialize};
use sqlx::FromRow;

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct CodeStats {
    pub id: String,
    pub author: String,
    pub web_code: String,
    pub api_code: String,
    pub container: String
}
