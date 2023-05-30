import prisma from '@component/lib/prismaClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { timeSpent, wordCount, content, address } = req.body;

    // Check if a User exists for this address or username
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ walletAddress: address }],
      },
    });

    if (!user) {
      // create a new User if needed
      user = await prisma.user.create({
        data: {
          walletAddress: address,
        },
      });
    }

    // create a new Run associated with the User
    const newRun = await prisma.run.create({
      data: {
        timeSpent,
        wordCount,
        content,
        user: {
          connect: { id: user.id },
        },
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        readingCredits: {
          increment: timeSpent,
        },
      },
    });

    res.json(newRun);
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
