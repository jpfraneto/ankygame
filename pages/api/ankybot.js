import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
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
        content: `You are in charge of imagining a description of a human being in a cartoon world. I will send you a block of text that was written as a stream of consciousness, and your goal is to distill the essence of that writing so that you can come up with a graphic description of how the human that wrote it looks. Please avoid direct references to the writer, the goal of the prompt is just to get a description of how the human that created it looks like.

    Make it no more than 333 characters long.
    Here is the block of text: `,
      },
      { role: 'user', content: message },
    ];

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    const config = {
      headers: { Authorization: `Bearer ${process.env.IMAGINE_API_KEY}` },
    };

    const bodyParameters = {
      prompt: `https://s.mj.run/YLJMlMJbo70, The profile picture of a cartoon. ${completion.data.choices[0].message.content}`,
    };

    // console.log('going to imagine api.');
    // const responseFromImagineApi = await axios.post(
    //   'http://164.90.252.239:8055/items/images',
    //   bodyParameters,
    //   config
    // );
    // const imagineApiID = responseFromImagineApi.data.data.id;
    // console.log('IN HERE', responseFromImagineApi);

    const messages2 = [
      {
        role: 'system',
        content: `You are Anky, a representation of God, and you are in charge of distilling the essence of the block of text that you will get below, so that you can create with as much detail as possible a biography of the person that wrote it. The writing is a stream of consciousness, and your mission is to write the bio that will be displayed in this persons profile.

        Your goal is to make this person cry of emotion, because no one ever understood her as you did now.

        Don't use direct references to you as the creator of the text, just write it as if this person had written it.

        Here is the block of text: `,
      },
      { role: 'user', content: message },
    ];

    const completion2 = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages2,
    });
    if (completion.data && completion2.data) {
      // let requestStatus = false;
      // while (!requestStatus) {
      //   const intervalId = setInterval(async () => {
      //     console.log('inside the interval');
      //     const gettingImageApiResponse = await axios.get(
      //       `http://164.90.252.239:8055/items/images/${imagineApiID}`,
      //       bodyParameters,
      //       config
      //     );
      //     console.log('alooooja', gettinImageApiResponse.data.data);
      //     if (false) {
      //       clearInterval(intervalId);
      //       res.status(200).json({
      //         message: 'listoco',
      //       });
      //     }
      //   }, [10000]);
      // }

      res.status(200).json({
        imagePromptForMidjourney: `https://s.mj.run/YLJMlMJbo70, The profile picture of a cartoon. ${completion.data.choices[0].message.content}`,
        bio: completion2.data.choices[0].message.content,
      });
    } else {
      res.status(200).json({
        imagePromptForMidjourney: `There was an error generating your prompt. `,
        bio: `There was an error generating the bio with what you wrote. But no worries, it was saved to your profile and you will be able to access it later.`,
      });
    }
  } catch (error) {
    console.log('there was another error in this thing.', error);

    if (error.response) {
      console.log(error.response.status, error.response.data);
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
