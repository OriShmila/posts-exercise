import { Pool } from "pg";

export const fetchPostCount = async (clientConnection: Pool) => {
  const result = await clientConnection.query(`SELECT
        COUNT(*)
    FROM posts_exercise.posts;`);

  return result.rows[0];
};
