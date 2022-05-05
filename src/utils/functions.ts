import { FormattedResponse } from "../types";

export function formatFindAndCountResponse<T>(data: [T[], number]) {
  const [result, count] = data;

  const formattedResponse: FormattedResponse<T> = {
    results: result,
    count,
  };

  return formattedResponse;
}
