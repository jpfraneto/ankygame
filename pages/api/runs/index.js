import prisma from '@component/lib/prismaClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { twitterUser, timeSpent, wordCount, content } = req.body;
    const newRun = await prisma.run.create({
      data: {
        twitterUser,
        timeSpent,
        wordCount,
        content,
      },
    });
    res.json(newRun);
  } else if (req.method === 'GET') {
    const topRuns = await prisma.run.findMany({
      take: 10,
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
