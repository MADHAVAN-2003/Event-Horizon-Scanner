import SQLite from 'react-native-sqlite-storage';

// SQLite.DEBUG(true);
SQLite.enablePromise(true);

export let db: SQLite.SQLiteDatabase;

const getDBConnection = async () => {
  try {
    db = await SQLite.openDatabase({
      name: 'app.db',
      location: 'default',
    });

    console.log('Database opened successfully');
    return db;
  } catch (error) {
    console.error('Error opening database', error);
    throw error;
  }
};

// Create tables
const createTables = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS sync_meta (
      key TEXT PRIMARY KEY,
      value TEXT
    );`,

    `CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id TEXT NOT NULL,
      name TEXT,
      event_name TEXT,
      status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT
    );`,

    `CREATE INDEX IF NOT EXISTS idx_ticket_id ON tickets(ticket_id);`,
  ];

  try {
    for (const query of queries) {
      await db.executeSql(query);
    }
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables', error);
    throw error;
  }
};

// Initialize DB
export const initializeDatabase = async () => {
  try {
    await getDBConnection();
    await createTables();
  } catch (error) {
    console.error('Error initializing database', error);
  }
};

(async () => {
  try {
    await initializeDatabase();
  } catch (error) {
    console.log('error while initialize database: ', error);
  }
})();

// Export DB instance
export const getDB = () => db;
