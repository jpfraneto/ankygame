import { ThirdwebAuth } from '@thirdweb-dev/auth/next';
import { PrivateKeyWallet } from '@thirdweb-dev/auth/evm';

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: 'anky.lat',
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ''),
});
