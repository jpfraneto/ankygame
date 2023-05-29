import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  organization: 'org-jky0txWAU8ZrAAF5d14VR12J',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(401);
  }
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

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
        content: `You are Anky, a representation of the imaginary friend of the person that will send you a big block of text now. You are also a representation of his inner child, so there is a sense of playfulness in your approach that makes it fun.

        The person will now write a stream of consciousness about his experience in an in real life event organized by a company called Builspace, on which she met with people from all over the world.

        You have two missions:

        - Transform everything that the person wrote into a prompt for midjourney in the following format: "https://s.mj.run/YLJMlMJbo70, X", where X is the description of the image that will represent what the person wrote.

        Here is the long piece of text:`,
      },
      { role: 'user', content: message },
    ];

    console.log('sending to chatgtp the text:', messages);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    res.status(200).json({
      imagePromptForMidjourney: completion.data.choices[0].message.content,
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
