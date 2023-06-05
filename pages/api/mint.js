import axios from 'axios';
import prisma from '@component/lib/prismaClient';
import FormData from 'form-data';

const JWT = `Bearer ${process.env.PINATA_JWT}`;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await pinFileToIPFS(req.body);
      res.status(200).json({ profile: response });
    } catch (error) {
      console.log('the error is: ', error);
      res.status(500).json({ error: 'Could not process your request.' });
    }
  } else {
    res.status(405).json({ error: 'Method not supported.' });
  }
}

const pinFileToIPFS = async formData => {
  const data = new FormData();

  // Create a buffer from the Base64 string and append it to the FormData
  const imageBuffer = Buffer.from(formData.image.split(',')[1], 'base64');
  data.append('file', imageBuffer, { filename: 'image.png' });

  const metadata = JSON.stringify({
    name: formData.address,
    bio: formData.description,
  });
  data.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  data.append('pinataOptions', options);

  const res = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    data,
    {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        Authorization: JWT,
      },
    }
  );
  if (res.data.IpfsHash) {
    console.log('the ipfs hash is: ', res.data.IpfsHash);

    const user = await prisma.user.findUnique({
      where: { walletAddress: formData.address },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const profile = await prisma.profile.create({
      data: {
        writing: formData.writing, // Assuming that `formData` contains the user's writing
        imageUrl: `https://ipfs.io/ipfs/${res.data.IpfsHash}`,
        bio: formData.description,
        userId: user.id, // Associate the profile with the user
        timeSpent: formData.timeSpent,
      },
    });

    console.log('the profile that just was created is: ', profile);
    return profile;
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Set desired value here
    },
  },
};
