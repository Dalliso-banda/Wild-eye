import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'wild_eye_admin',
      password: 'your_secure_password',
      database: 'wild',
    },
    migrations: {
    
      directory: path.join(__dirname, 'migrations'),
    },
  },
};
