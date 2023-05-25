import { Configuration, OpenAIApi } from 'openai';
import prisma from '@component/lib/prismaClient';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body.body, res);
    console.log('opain', openai);
  } else if (req.method === 'GET') {
  } else if (req.method === 'DELETE') {
  }
}
