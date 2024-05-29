use crate::utils::errors::SunburstError;
use crate::{Context, Data, Error};
use openai::chat::{ChatCompletion, ChatCompletionMessage, ChatCompletionMessageRole};
use poise::serenity_prelude::CreateAllowedMentions;
use poise::{Command, CreateReply};

/// Ask something to ChatGPT
#[poise::command(slash_command, prefix_command)]
pub async fn ask(
    ctx: Context<'_>,
    #[description = "Your message"] message: String,
) -> Result<(), Error> {
    // TODO: Stream response

    let messages = vec![
        ChatCompletionMessage {
            role: ChatCompletionMessageRole::System,
            content: Some("You are an useful assistant.".to_owned()),
            name: None,
            function_call: None,
        },
        ChatCompletionMessage {
            role: ChatCompletionMessageRole::User,
            content: Some(message.to_owned()),
            name: Some("Manolo".to_owned()),
            function_call: None,
        },
    ];

    let chat_completion = ChatCompletion::builder("gpt-3.5-turbo", messages)
        .max_tokens(u64::try_from(128)?)
        .create()
        .await?;

    let response = chat_completion
        .choices
        .first()
        .ok_or(SunburstError::ArgumentError)?;

    let returned_message = response.message.clone();
    let content = returned_message
        .content
        .ok_or(SunburstError::ArgumentError)?;

    let reply = CreateReply::default()
        .content(content)
        .allowed_mentions(CreateAllowedMentions::default().everyone(false));

    ctx.send(reply).await?;

    Ok(())
}

pub fn commands() -> Vec<Command<Data, Error>> {
    vec![ask()]
}
