import { Pool } from "pg";

export const fetch = (
  clientConnection: Pool,
  limit: number = null,
  offset: number = null
) =>
  clientConnection.query(
    `SELECT id, title, body, name as creator_name
        FROM posts_exercise.posts
        INNER JOIN posts_exercise.creators on creators.id = posts.creator_id
        ORDER BY creation_datetime ASC
        LIMIT $1 OFFSET $2;`,
    [limit, offset]
  );
