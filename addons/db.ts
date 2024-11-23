import sqlite3 from 'sqlite3';

export const getDb = async () => {
  const db = new sqlite3.Database('db.sqlite');
  return new Promise<void>((resolve) => {
    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS sometable (id INTEGER PRIMARY KEY, title TEXT, url TEXT)', resolve);
    });
  });
}
