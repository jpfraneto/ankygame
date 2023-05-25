import { Configuration, OpenAIApi } from 'openai';
import prisma from '@component/lib/prismaClient';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req, res);
  } else if (req.method === 'GET') {
  } else if (req.method === 'DELETE') {
  }
}
