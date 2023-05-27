import { ThirdwebAuth } from '@thirdweb-dev/auth/next';
import { PrivateKeyWallet } from '@thirdweb-dev/auth/evm';

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.DOMAIN,
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ''),
  callbacks: {
    onLogin: async user => {
      // Create a new user entry if the user doesn't exist
      console.log('inside the onLogin function', user);
      if (!(await dbExample.userExists(user.address))) {
        await dbExample.createUser({ address: user.address });
      }
    },
  },
});

export default ThirdwebAuthHandler();
