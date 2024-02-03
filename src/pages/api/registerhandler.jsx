// import {db} from "@/lib/db";

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { username, email, password } = req.body;

//     try {
//       const result = await db.one('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
//       res.status(200).json({ user: result });
//     } catch (error) {
//       console.error('Error during registration:', error);
//       res.status(500).json({ error: 'Registration failed' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }



// registerhandler.js

import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    const argon2 = require('argon2');

    try {
      // Hash the password before storing it
      const hashedPassword = await argon2.hash(password, 10);
      
      console.log('Received data:', { username, email, hashedPassword });
      // Add user to the database
      const result = await db.one(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]
      );
      
      res.status(200).json({ user: result });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
