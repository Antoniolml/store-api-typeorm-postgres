import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: parseInt(process.env.DATABASE_PORT) || 5432,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
