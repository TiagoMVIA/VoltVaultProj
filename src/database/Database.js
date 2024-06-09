import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "ChargingPoints.db";
const database_version = "1.0";
const database_displayname = "SQLite Charging Points Database";
const database_size = 200000;

export const getDBConnection = async () => {
    let db = await SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size
    );
    return db;
};

export const createTable = async (db) => {
    await db.executeSql(
        `CREATE TABLE IF NOT EXISTS ChargingPoints (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT,
      type TEXT,
      status TEXT,
      isFav BOOLEAN
    );`
    );
};

export const getChargingPoints = async (db) => {
    let results = await db.executeSql(`SELECT * FROM ChargingPoints`);
    let points = [];
    results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
            points.push(result.rows.item(i));
        }
    });
    return points;
};

export const addChargingPoint = async (db, location, type, status) => {
    await db.executeSql(`INSERT INTO ChargingPoints (location, type, status, isFav) VALUES (?, ?, ?, ?)`, [location, type, status, false]);
};

export const updateFavoriteStatus = async (db, id, isFav) => {
    await db.executeSql(`UPDATE ChargingPoints SET isFav = ? WHERE id = ?`, [isFav ? 1 : 0, id]);
};

export const updateChargingPoint = async (db, id, location, type, status) => {
    try {
        await db.executeSql(
            `UPDATE ChargingPoints SET location = ?, type = ?, status = ? WHERE id = ?`,
            [location, type, status, id]
        );
    } catch (error) {
        console.error("Error updating charging point:", error);
        throw error;
    }
};
