import versedb from "verse.db";
import { database } from "./connection.json";

const db = new versedb.connect(database);

export { db };