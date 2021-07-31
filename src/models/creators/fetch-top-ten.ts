import { Pool } from "pg";

export const fetchTopTen = async (clientConnection: Pool) => {
  const result = await clientConnection.query(`SELECT id, name FROM (
        SELECT creator_id, COUNT(*) AS num
            FROM posts_exercise.posts
            GROUP BY creator_id
            ORDER BY num DESC
            LIMIT 10) top_creators
        INNER JOIN posts_exercise.creators ON creators.id = top_creators.creator_id;
        `);

  return result.rows;
};
