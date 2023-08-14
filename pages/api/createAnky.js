import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

export default async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(401);
  }

  try {
    const prompt = req.body.prompt;
    const responseFromImagineAPI = await requestCharacterImage(
      `https://s.mj.run/YLJMlMJbo70, The profile picture of a cartoon. ${prompt}`
    );
    console.log('The response from imagine API is: ', responseFromImagineAPI);

    if (responseFromImagineAPI) {
      res.status(200).json({
        imagineApiId: responseFromImagineAPI,
      });
    } else {
      res.status(200).json({
        imagePromptForMidjourney: `There was an error generating your prompt. `,
        bio: `There was an error generating the bio with what you wrote. But no worries, it was saved to your profile and you will be able to access it later.`,
      });
    }
  } catch (error) {}
}

async function requestCharacterImage(promptForMidjourney) {
  console.log('Inside the request character image function');
  try {
    const responseFromImagineApi = await fetchImageFromMidjourney(
      promptForMidjourney
    );

    console.log(
      'the response from imagine api HERE is: ',
      responseFromImagineApi
    );
    return responseFromImagineApi.id;
  } catch (error) {
    console.log('there was an error in the requestCahracterImage function');

    return null;
  }
}

async function fetchImageFromMidjourney(promptForMidjourney) {
  console.log(
    'inside the fetchimagefrommidjourney function, the prompt for midjourney is:',
    promptForMidjourney
  );
  if (!promptForMidjourney)
    return console.log('there is no prompt for midjourney!');
  try {
    const config = {
      headers: { Authorization: `Bearer ${process.env.IMAGINE_API_KEY}` },
    };

    const response = await axios.post(
      `http://146.190.131.28:8055/items/images`,
      { prompt: promptForMidjourney },
      config
    );
    console.log('The image was prompted to midjourney.');
    return response.data.data;
  } catch (error) {
    console.log('there was an error fetching imagineApi');
    return null;
  }
}
