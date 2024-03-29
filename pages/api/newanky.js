import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

import { getNewRandomCharacter } from '../../lib/ankyGenerationMessagesForTraits';
import { generateCharacterStory } from '../../lib/newGenesis';

export default async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(401);
  }

  try {
    const character = getNewRandomCharacter();
    const characterNew = await generateCharacterStory(
      character,
      req.body.content
    );
    return res.json({ character: characterNew });
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
