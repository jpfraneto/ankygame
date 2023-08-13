import axios from 'axios';

export default async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(401);
  }

  try {
    const body = {
      email: req.body.email,
      chain: 'ethereum',
    };

    const response = await fetch(
      `https://staging.crossmint.com/api/v1-alpha1/wallets`,
      {
        method: 'POST',
        headers: {
          'X-PROJECT-ID': '<YOUR_PROJECT_ID>',
          'X-CLIENT-SECRET': '<YOUR_CLIENT_SECRET>',
        },
        body: JSON.stringify(body),
      }
    );

    const wallet = await response.json();
  } catch (error) {}
}
