import { init } from 'next-firebase-auth';

const SEVEN_DAYS_IN_MS = 7 * 60 * 60 * 24 * 1000;

const initAuth = (): void => {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID not set.');
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY not set.');
  }

  const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
  if (!databaseURL) {
    throw new Error('NEXT_PUBLIC_FIREBASE_DATABASE_URL not set.');
  }

  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login',
    logoutAPIEndpoint: '/api/logout',
    // firebaseAuthEmulatorHost: 'localhost:9099',
    firebaseAdminInitConfig: {
      credential: {
        projectId,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
        privateKey: process.env.FIREBASE_PRIVATE_KEY || '',
      },
      databaseURL,
    },
    firebaseClientInitConfig: {
      apiKey,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    },
    cookies: {
      name: 'momentry', // required
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: SEVEN_DAYS_IN_MS,
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true',
      signed: true,
    },
  });
};

export default initAuth;
