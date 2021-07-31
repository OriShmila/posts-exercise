import { Pool } from "pg";

export const initDb = async (connectionString: string) => {
  try {
    const clientConnection = await connectDb(connectionString);

    clientConnection.query(`CREATE SCHEMA IF NOT EXISTS posts_exercise;`);

    clientConnection.query(`CREATE TABLE IF NOT EXISTS posts_exercise.creators (
            id SERIAL PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            UNIQUE(name)
            );`);

    clientConnection.query(`CREATE TABLE IF NOT EXISTS posts_exercise.posts (
            id SERIAL PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            creation_datetime TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
            creator_id INT NOT NULL REFERENCES public.creators(id)
            );`);

    clientConnection.query(`CREATE TABLE IF NOT EXISTS posts_exercise.statistics (
            id SERIAL PRIMARY KEY NOT NULL,
            times_number INT NOT NULL DEFAULT 0,
            average_runtime INT NOT NULL DEFAULT 0,
            method_name text,
            UNIQUE(method_name)
            );`);

    return clientConnection;
  } catch (error) {
    console.error(error.message);

    return null;
  }
};

export const connectDb = async (connectionString: string) => {
  const connection: Pool = new Pool({
    connectionString,
  });

  await connection.connect();
  console.log("Connected to Postgres database");

  return connection;
};
