const {
  getCharacterSystemMessage,
} = require('./ankyGenerationMessagesForTraits');
const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const prisma = require('./prismaClient');

const configuration = new Configuration({
  organization: 'org-jky0txWAU8ZrAAF5d14VR12J',
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateCharacterStory(character, userWriting) {
  const characterSystemMessage = await getCharacterSystemMessage(character);

  try {
    const messages = [
      {
        role: 'system',
        content: characterSystemMessage,
      },
      {
        role: 'user',
        content: userWriting,
      },
    ];

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: messages,
    });

    console.log(
      'The call to chatgtp was successful',
      completion.data.choices[0].message.content
    );

    const dataResponse = completion.data.choices[0].message.content;

    const nameRegex = /"characterName"\s*:\s*"([\s\S]*?)"/;
    const backstoryRegex = /"characterBackstory"\s*:\s*"([\s\S]*?)"/;
    const promptForMidjourneyRegex = /"promptForMidjourney"\s*:\s*"([\s\S]*?)"/;

    const nameMatch = dataResponse.match(nameRegex);
    const backstoryMatch = dataResponse.match(backstoryRegex);
    const promptForMidjourneyMatch = dataResponse.match(
      promptForMidjourneyRegex
    );

    let characterName, characterBackstory, promptForMidjourney;

    if (nameMatch !== null && nameMatch.length > 1) {
      characterName = nameMatch[1];
    }

    if (backstoryMatch !== null && backstoryMatch.length > 1) {
      characterBackstory = backstoryMatch[1];
    }

    if (
      promptForMidjourneyMatch !== null &&
      promptForMidjourneyMatch.length > 1
    ) {
      promptForMidjourney = `https://s.mj.run/YLJMlMJbo70, The profile picture of a cartoon. ${promptForMidjourneyMatch[1]}`;
    }

    const newCharacter = {
      promptForMidjourney,
      characterName,
      characterBackstory,
      completionResponse: completion.data.choices[0].message.content,
    };
    const responseFromImagineAPI = await requestCharacterImage(newCharacter);
    newCharacter.imagineApiId = responseFromImagineAPI;
    return newCharacter;
  } catch (error) {
    console.log(
      'There was an error in the generateCharacterStory function, it will be pushed back into the voidQueue'
    );
    console.log(error);
    console.log(error.response.data.error);
    return error;
  }
}

async function requestCharacterImage(character) {
  console.log('Inside the request character image function');
  try {
    const responseFromImagineApi = await fetchImageFromMidjourney(
      character.promptForMidjourney
    );

    // Update the character's state in the database, from GERMINAL to EMBRYONIC.
    console.log('the response from imagine api is: ', responseFromImagineApi);
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

async function fetchImage(imageId, characterId) {
  const config = {
    headers: { Authorization: `Bearer ${process.env.IMAGINE_API_KEY}` },
  };
  try {
    const response = await axios.get(
      `http://146.190.131.28:8055/items/images/${imageId}`,
      config
    );
    console.log('Fetched from imagineAPI', response.data.data);
    return response.data.data;
  } catch (error) {}
}

// Error handler
function handleError(err) {
  console.error('An error occurred:', err);
}

module.exports = {
  generateCharacterStory,
  requestCharacterImage,
  fetchImageFromMidjourney,
  fetchImage,
};
