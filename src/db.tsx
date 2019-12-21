import dependenciesBridge from './dependenciesBridge';
import { Database } from 'sqlite';

/**
 * Database interaction methods
 */

const { __dirname, isDev, path, sqlite } = dependenciesBridge;

let instance: Database|null = null;

/** Returns permanent instance connected to local database */
const getInstance = async (): Promise<Database> => {
  if (!instance) {
    const dbPath: string = isDev
      ? path.join(__dirname, '..', 'db', 'neptune.sqlite')
      : path.join(__dirname, 'neptune.sqlite');

    instance = await sqlite.open(dbPath);
  }

  return instance;
}

export default getInstance;