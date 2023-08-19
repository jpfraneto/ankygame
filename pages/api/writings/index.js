import axios from 'axios';
import prisma from '@component/lib/prismaClient';

export default async function (req, res) {
  if (req.method === 'GET') {
    try {
      const writings = await prisma.writing.findMany({});
      res.status(200).json(writings);
    } catch (error) {
      console.log('There was an error fetching the writings');
      res.status(500).json({ error: 'Unable to fetch writings' });
    }
  }
  if (req.method === 'POST') {
    try {
      console.log('the req.body is:', req.body);
      const { timeSpent, content } = req.body;
      const newWriting = await prisma.writing.create({
        data: {
          text: content,
          time: timeSpent,
        },
      });
      console.log('The writing was added to the DB', newWriting);
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.log('There was an error adding the writing to the DB');
      console.log(error);
      res.json(401).json({ message: 'There was an error' });
    }
  }
}
