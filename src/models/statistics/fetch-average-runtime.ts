import { Pool } from "pg";

export const fetchAverageRuntimeOf = async (
  methodName: string,
  clientConnection: Pool
) => {
  const result = await clientConnection.query(
    `SELECT average_runtime
	FROM posts_exercise.statistics
	WHERE method_name = $1;`,
    [methodName]
  );

  return result.rows;
};
