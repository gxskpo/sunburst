use crate::Error;
use poise::serenity_prelude as serenity;

#[allow(clippy::unused_async)]
pub async fn handler(
    // _ctx: &serenity::Context,
    event: &serenity::FullEvent,
    // _framework: poise::FrameworkContext<'_, Data, Error>,
) -> Result<(), Error> {
    if let serenity::FullEvent::Ready { data_about_bot, .. } = event {
        println!("Logged in as {}", data_about_bot.user.name);
    }
    /*
    match event {
        serenity::FullEvent::Ready { data_about_bot, .. } => {
            println!("Logged in as {}", data_about_bot.user.name);
        }
        _ => {}
    };
    */
    Ok(())
}
