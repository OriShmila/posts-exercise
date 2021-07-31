import { Pool } from "pg";

export const fetch = async (
  clientConnection: Pool,
  limit: number = null,
  offset: number = null
) => {
  const result = await clientConnection.query(
    `SELECT posts.id, posts.title, posts.body, creators.name as creator_name
        FROM posts_exercise.posts
        INNER JOIN posts_exercise.creators on creators.id = posts.creator_id
        ORDER BY creation_datetime ASC
        LIMIT $1 OFFSET $2;`,
    [limit || null, offset || null]
  );

  return result.rows;
};
