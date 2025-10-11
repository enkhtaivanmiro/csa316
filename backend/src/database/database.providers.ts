import { Pool } from 'pg';

export const POSTGRES_POOL = 'POSTGRES_POOL';

export const postgresPoolProvider = {
  provide: POSTGRES_POOL,
  useFactory: () => {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  },
};
