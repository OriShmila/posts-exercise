import { Pool } from "pg";

export const fetchAverageRuntimeOf = (
  methodName: string,
  clientConnection: Pool
) =>
  clientConnection.query(
    `SELECT average_runtime
	FROM posts_exercise.statistics
	WHERE method_name = $1;`,
    [methodName]
  );
