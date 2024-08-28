const versedb = require("verse.db");
const { database } = require("./connection.json");

const db = new versedb.connect(database);

module.exports.db = db;