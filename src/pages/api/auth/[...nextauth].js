import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
const argon2 = require('argon2');

export default NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', credentials.username);

          if (user) {
            const passwordMatch = await argon2.verify(user.password, credentials.password);

            if (passwordMatch) {
              return Promise.resolve(user);
            } else {
              return Promise.resolve(null); // Incorrect password
            }
          } else {
            return Promise.resolve(null); // User not found
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  database: process.env.DATABASE_URL,
});
