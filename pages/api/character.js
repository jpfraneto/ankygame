import prisma from '@component/lib/prismaClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('INSIDE HERE, THE REQ BODY IS: ', req.body);

    // Check if a User exists for this address or username

    // create a new Run associated with the User
    const newCharacter = await prisma.character.create({
      data: {
        name: req.body.character.name,
        traits: req.body.character.traits,
        upscaledImageUrls: req.body.character.upscaledImageUrls,
        chosenImageUrl: req.body.character.chosenImageUrl,
        promptForMidjourney: req.body.character.promptForMidjourney,
      },
    });

    console.log('the new character is: ', newCharacter);

    res.status(200).json({ message: 'The character was added to the DB' });
  } else if (req.method === 'GET') {
    const topRuns = await prisma.run.findMany({
      take: 20,
      orderBy: {
        timeSpent: 'desc',
      },
    });
    res.json(topRuns);
  } else if (req.method === 'DELETE') {
    const deletedRuns = await prisma.run.deleteMany();
    console.log('the runs were deleted');
    res.status(200).json({ message: 'All runs deleted successfully' });
  }
}
