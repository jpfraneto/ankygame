import prisma from '@component/lib/prismaClient';

export default async function handle(req, res) {
  if (req.method === 'DELETE') {
    await prisma.characterBackup.deleteMany();
    console.log('All the backup characters were deleted');
    res.status(200).send('All characters deleted');
  }
  if (req.method === 'GET') {
    const characters = await prisma.characterBackup.findMany();
    res.json(characters);
  } else {
    res.status(405).send('Method not allowed'); // Only allow GET requests
  }
}
