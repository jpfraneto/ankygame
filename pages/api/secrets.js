import { getUser } from './auth/[...thirdweb]';

export default async (req, res) => {
  // Get the user off the request
  const user = await getUser(req);
  console.log('in here, the user is:', user);

  // Check if the user is authenticated
  if (!user) {
    return res.status(401).json({
      message: 'Not authorized.',
    });
  }

  // Return a protected resource to the authenticated user
  return res.status(200).json({
    message: `This is a secret for ${user.address}.`,
  });
};
