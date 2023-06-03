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
  console.log('inside the ankydementor: ', req.body.message);
  const message = req.body.message || '';
  if (message.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid message',
      },
    });
    return;
  }

  try {
    const messages = [
      {
        role: 'system',
        content: `You are Anky, a representation of God, and you are in charge of distilling the essence of the block of text that you will get below, so that you can create with as much detail as possible who is the person that wrote them. The writing is a stream of consciousness, and your mission is to write the bio that will be displayed in this persons profile.

    Your goal is to make this person cry of emotion, because no one ever understood her as you did now.

    Here is the block of text: `,
      },
      { role: 'user', content: message },
    ];

    console.log('the messages are: ', messages);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    console.log('the completion is: ', completion.data);

    console.log(
      'the dcompletion data is: ',
      completion.data.choices[0].message
    );

    res.status(200).json({
      personDescription: completion.data.choices[0].message.content,
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
