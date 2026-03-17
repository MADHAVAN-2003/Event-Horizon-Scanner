import { db } from './db';

export const saveUser = async (email: string) => {
  await db.executeSql(`INSERT OR REPLACE INTO user (email) VALUES (?)`, [
    email,
  ]);
};

export const checkUserLoggedIn = async () => {
  const result = await db.executeSql(`SELECT * FROM user LIMIT 1`);

  if (result[0].rows.length > 0) {
    return true;
  }

  return false;
};

export const logout = async () => {
  await db.executeSql(`DELETE FROM user`);
};
