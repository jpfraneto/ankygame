import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  organization: 'org-jky0txWAU8ZrAAF5d14VR12J',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }
  // const password = req.body.password;
  // if (password.trim() !== process.env.ANKYPASSWORD) {
  //   res.status(400).json({
  //     error: {
  //       message: 'Please enter a valid password',
  //     },
  //   });
  //   return;
  // }

  const message = req.body.message || '';
  if (message.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid message',
      },
    });
    return;
  }
  // return res
  //   .status(200)
  //   .json({
  //     imagePromptForMidjourney:
  //       "https://s.mj.run/YLJMlMJbo70, The profile picture of a cartoon. The character is subtly caught in the fleeting essence of time, their relaxed demeanor contrasting with the hurried world around them. There's a unique calmness to their gaze, like they're someone who takes time with things, never rushing - perhaps even a slow typist. They're immersed in an atmosphere that resembles a symphony, the rhythm of their life seemingly guided by an unseen musical force. The power of music seems to have an impact on them, as though it's capable of altering their state of mind, even inducing a profound sense of peace. The character’s features radiate a soothing tranquility that seems to softly whisper, 'In this fleeting world, there is time for peace. ",
  //   });

  try {
    const messages = [
      {
        role: 'system',
        content: `You are in charge of crafting a prompt for midjourney, which is an image generator. I will send you a block of text that was written by a human being as a stream of consciousness, and your goal is to distill the essence of that writing so that you can come up with a graphic description of how the human that wrote it looks. Please avoid direct references to the writer, the goal of the prompt is just to get a description of how the human that created it looks like.

    Come up with a conscise writing for this. Make it no more than 333 characters long.
    Here is the block of text: `,
      },
      { role: 'user', content: message },
    ];

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    res.status(200).json({
      imagePromptForMidjourney:
        `https://s.mj.run/YLJMlMJbo70, The profile picture of a cartoon` +
        completion.data.choices[0].message.content,
    });
  } catch (error) {
    console.log('there was another error in this thing.', error);

    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.log('THE ERROR IS: ', error);
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}
