import axios from 'axios';

async function fetchImage(imageId) {
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

export default async function (req, res) {
  console.log('INSIDE HEREEE, fetching the image');
  if (req.method !== 'POST') {
    return res.status(401);
  }
  const imageId = req.body.imageId;
  console.log('THE IMAGE ID IS: ', imageId);
  try {
    const imageResponse = await fetchImage(imageId);
    console.log('the image Response is: ', imageResponse);
    res.json(imageResponse);
  } catch (error) {
    console.log('the error is: ', error);
    res.json(error);
  }
}
