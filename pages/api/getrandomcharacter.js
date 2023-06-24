import prisma from '@component/lib/prismaClient';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log('inside the get random character route');
    const characters = await prisma.characterBackup.findMany({
      where: { state: 'BIRTHED' },
    });
    const randomCharacter =
      characters[Math.floor(Math.random() * characters.length)];
    res.json({ randomCharacter });
  }
}
