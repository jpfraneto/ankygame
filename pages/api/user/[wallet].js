import { getUser } from '@component/pages/api/auth/[...thirdweb]';
import prisma from '@component/lib/prismaClient';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { walletAddress: req.query.wallet },
        include: { runs: true },
      });
      console.log('the user is: ', user);
      res.status(200).json({ user });
    } catch (error) {
      console.log('The error is: ', error);
      res.status(500).json({ message: 'There was an error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { username } = req.body;
      // Check if the username is available
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUser) {
        res.status(409).send('Username is already taken!');
        return;
      }

      // Update the user
      const user = await prisma.user.update({
        where: { walletAddress: req.query.wallet },
        data: { username },
      });
      res.status(200).json({ user });
    } catch (error) {
      console.log('There was an error updating the user', error);
      res.status(500).json({ message: error });
    }
  }
};
