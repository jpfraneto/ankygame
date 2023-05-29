import { getUser } from '@component/pages/api/auth/[...thirdweb]';
import prisma from '@component/lib/prismaClient';

export default async (req, res) => {
  if (req.method === 'GET') {
    // Get the user off the request
    const users = await prisma.user.findMany({});
    res.status(200).json({ users });
  }
};
