import axios from 'axios';

export default async function (req, res) {
  if (req.method === 'GET') {
    const config = {
      headers: { Authorization: `Bearer ${process.env.IMAGINE_API_KEY}` },
    };

    const response = await axios.get(
      `http://164.90.252.239:8055/items/images/${imageId}`,
      config
    );
    console.log('Fetching from imagineAPI', response.data.data);
    if (
      response.data.data.status !== 'pending' &&
      response.data.data.status !== 'in-progress'
    ) {
      return response;
    }
  }
  if (req.method !== 'POST') {
    return res.status(401);
  }

  let promptForMidjourney = req.body.promptForMidjourney;
  if (!promptForMidjourney)
    return res.json({ message: 'Please add the prompt for midjourney' });

  try {
    const config = {
      headers: { Authorization: `Bearer ${process.env.IMAGINE_API_KEY}` },
    };

    const bodyParameters = {
      prompt: promptForMidjourney,
    };

    console.log('going to imagine api.');
    const responseFromImagineApi = await axios.post(
      'http://164.90.252.239:8055/items/images',
      bodyParameters,
      config
    );
    const imagineApiID = responseFromImagineApi.data.data.id;

    res.status(200).json({
      midjourneyImageId: imagineApiID,
    });
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
