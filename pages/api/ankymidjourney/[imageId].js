import axios from 'axios';

export default async function (req, res) {
  if (req.method !== 'GET') {
    return res.status(401);
  }
  const config = {
    headers: { Authorization: `Bearer ${process.env.IMAGINE_API_KEY}` },
  };

  const response = await axios.get(
    `http://164.90.252.239:8055/items/images/${req.query.imageId}`,
    config
  );
  console.log('Fetching from imagineAPI', response.data.data);

  return res.json({ imageData: response.data.data });
}
