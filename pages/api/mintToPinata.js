import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
const FormData = require('form-data');
const fs = require('fs');
const JWT = process.env.PINATA_JWT;
const crypto = require('crypto');

export default async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(401);
  }
  try {
    const { upscaledImageUrl, ankyResponse, userWriting, imagineApiId } =
      req.body;
    const id = crypto.randomBytes(16).toString('hex');
    const result = await pinFileToIPFS(upscaledImageUrl, id);
    console.log('the pinned image info is: ', result);

    const metadataResult = await uploadMetadata(
      id,
      userWriting,
      ankyResponse,
      result.IpfsHash
    );
    console.log('the pinned metadata info is: ', result);
    res.json({
      message: `The image was pinned successfully here: ${metadataResult}`,
    });
  } catch (error) {
    console.log('2the error is: ', error);
    res
      .status(500)
      .json({ message: 'There was an error pinning the files to pinata' });
  }
}

const pinFileToIPFS = async (upscaledImageUrl, id) => {
  const formData = new FormData();

  try {
    // 1. Get the image as a stream
    const response = await axios.get(upscaledImageUrl, {
      responseType: 'stream', // important to set this for binary data
    });

    // Append the stream to the FormData
    formData.append('file', response.data, `${id}.png`); // Assuming it's a PNG, change if necessary

    const pinataMetadata = JSON.stringify({
      name: `${id}.png`,
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    const result = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log('this is the result', result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const uploadMetadata = async (name, userWriting, ankyResponse, CID) => {
  try {
    const data = JSON.stringify({
      pinataContent: {
        name: `${name}`,
        userWriting: `${userWriting}`,
        ankyResponse: `${ankyResponse}`,
        image: `ipfs://${CID}`,
      },
      pinataMetadata: {
        name: 'Anky Response',
      },
    });

    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: data,
    });
    const resData = await res.json();
    console.log('Metadata uploaded, CID:', resData.IpfsHash);
    return resData.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};
