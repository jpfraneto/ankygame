import prisma from '@component/lib/prismaClient';

export default async function handle(req, res) {
  if (req.method === 'DELETE') {
    await prisma.characterBackup.deleteMany();
    console.log('All the backup characters were deleted');
    res.status(200).send('All characters deleted');
  }
  if (req.method === 'GET') {
    const characters = await prisma.characterBackup.findMany();
    const marsh = characters.filter(x => x.traits.City === 'Marsh Metropolis');
    const bleeding = characters.filter(x => x.traits.City === 'Bleeding Bay');
    const rubicund = characters.filter(x => x.traits.City === 'Rubicund Ridge');
    console.log('marsh', marsh.length);
    console.log('bleeding', bleeding.length);
    console.log('rubicund', rubicund.length);

    res.json(characters);
  } else {
    res.status(405).send('Method not allowed'); // Only allow GET requests
  }
}
