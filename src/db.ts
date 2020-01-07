import { Database } from 'sqlite';
import dependenciesBridge from './dependenciesBridge';

/**
 * Database interaction methods
 */

const { __dirname, isDev, path, sqlite } = dependenciesBridge;

let instance: Database|null = null;

/** Returns permanent instance connected to local database */
export const getDbInstance = async (): Promise<Database> => {
  if (!instance) {
    const dbPath: string = isDev
      ? path.join(__dirname, '..', 'db', 'neptune.sqlite')
      : path.join(__dirname, 'neptune.sqlite');

    instance = await sqlite.open(dbPath);
  }

  return instance;
};

/** Returns last value of sequental identifier for specified table */
export const fetchLastId = async (tableName: string): Promise<number> => {
  const db = await getDbInstance();
  const query = 'select seq from sqlite_sequence where name = $tableName';
  return (await db.get<{seq: number}>(query, { $tableName: tableName })).seq;
};
