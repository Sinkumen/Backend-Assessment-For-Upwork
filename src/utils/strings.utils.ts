import { ParsedQs } from "qs";

function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

const getStringQueryParam = (
  param: string | ParsedQs | string[] | ParsedQs[]
): string | undefined => {
  return typeof param === "string" ? param : undefined;
};

export { capitalizeWords, getStringQueryParam };
