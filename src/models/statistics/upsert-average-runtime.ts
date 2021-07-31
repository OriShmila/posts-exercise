import { Pool } from "pg";

export interface AverageRuntimeRow {
  methodName: string;
  timesNumber: number;
  time: number;
}

export const upsertAverageRuntime = (
  clientConnection: Pool,
  averageRuntimeRow: AverageRuntimeRow
) => {
  clientConnection.query(
    `INSERT INTO posts_exercise.statistics(
        average_runtime, times_number, method_name)
        VALUES ($1 / $2, $2, $3)
    ON CONFLICT (method_name)
        DO UPDATE
        SET average_runtime = ((statistics.average_runtime * statistics.times_number) + $1)
        / (statistics.times_number + $2),
        times_number = statistics.times_number + $2
        WHERE statistics.method_name = $3;`,
    [
      averageRuntimeRow.time,
      averageRuntimeRow.timesNumber,
      averageRuntimeRow.methodName,
    ]
  );
};
