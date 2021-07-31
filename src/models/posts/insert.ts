import { Pool } from "pg";

export interface Post {
  title: string;
  body: string;
  creatorName: number;
}

export const insert = (
  clientConnection: Pool,
  { title, body, creatorName }: Post
) =>
  clientConnection.query(
    `WITH creator_id AS (
		SELECT id FROM posts_exercise.creators WHERE creators.name = $1
	),
	new_creator_id AS (
		INSERT INTO posts_exercise.creators( name )
			VALUES ($1)
			ON CONFLICT (name) DO NOTHING
			RETURNING id
	)
	INSERT INTO posts_exercise.posts(
        creator_id, title, body)
	SELECT creator.id, $2, $3
	FROM (
		SELECT id
		FROM creator_id
		UNION ALL
		SELECT id
		FROM new_creator_id
	) creator;`,
    [creatorName, title, body]
  );
