// use octocrab::{params::apps::CreateInstallationAccessToken, Octocrab, models::InstallationToken};

// use crate::common::config::env::AppEnvironment;

// pub async fn get_reports_for_issue(env: AppEnvironment, issue_number: u64) -> String {
//     let app_id = dotenvy::var("GITHUB_APP_ID").unwrap();
//     let app_key = dotenvy::var("GITHUB_APP_SECRET").unwrap();
//     let key = jsonwebtoken::EncodingKey::from_rsa_pem(app_key.as_bytes()).unwrap();

//     let token = octocrab::auth::create_jwt(app_id.parse::<u64>().unwrap().into(), &key).unwrap();

//     println!("{}", token);

//     let octocrab = Octocrab::builder().personal_token(token).build().unwrap();

//     let installations = octocrab
//         .apps()
//         .installations()
//         .send()
//         .await
//         .unwrap()
//         .take_items();

//     let mut create_access_token = CreateInstallationAccessToken::default();
//     create_access_token.repositories = vec!["nuit-info".to_string()];

//     let access_token: InstallationToken = octocrab
//         .post(
//             installations[0].access_tokens_url.as_ref().unwrap(),
//             Some(&create_access_token),
//         )
//         .await
//         .unwrap();

//     let octocrab = Octocrab::builder()
//         .personal_token(access_token.token)
//         .build()
//         .unwrap();

//     let mut comments = octocrab
//         .issues("nuit-info-tty", "nuit-info")
//         .list_comments(2)
//         .send()
//         .await
//         .unwrap();

//     let comments = comments.take_items();

//     for comment in comments.iter() {
//         if !comment.user.login.eq("github-actions[bot]") {
//             continue;
//         }

//         if let Some(comment) = comment.body.as_ref() {
//             println!("{}", comment);
//         }
//     }
// }