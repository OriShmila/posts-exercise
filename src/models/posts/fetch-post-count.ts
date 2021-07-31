import { Pool } from "pg";

export const fetchPostCount = (clientConnection: Pool) =>
  clientConnection.query(`SELECT
        COUNT(*)
    FROM posts_exercise.posts;`);
