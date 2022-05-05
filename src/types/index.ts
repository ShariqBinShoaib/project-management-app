import { FindOptionsOrder } from "typeorm";

export type FormattedResponse<T> = { results: T[]; count: number };

export type Order = "ASC" | "DESC";

export type FindOptions<T> = {
  skip?: number;
  take?: number;
  order?: FindOptionsOrder<T>;
};
