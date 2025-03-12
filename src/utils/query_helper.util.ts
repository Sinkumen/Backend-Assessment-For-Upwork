import { Op, WhereOptions } from "sequelize";

interface TodoQueryParams {
  filter?: "all" | "completed" | "uncompleted";
}

/**
 * Builds query conditions for fetching todos based on user filters.
 */
export const buildTodoQuery = (
  query: TodoQueryParams,
  userId: string
): { where: WhereOptions; order: [string, string][] } => {
  const { filter = "all" } = query;

  const where: WhereOptions = { userId };
  let order: [string, string][] = [["createdAt", "DESC"]];

  if (filter === "completed") {
    where.completed = true;
    order = [["completedAt", "ASC"]];
  } else if (filter === "uncompleted") {
    where.completed = false;
  }

  return { where, order };
};
