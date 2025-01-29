function parseNumber(value, defaultValue) {
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  const parseValue = parseInt(value);
  if (Number.isNaN(parseValue) === true) {
    return defaultValue;
  }
  return parseValue;
}

export function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return { page: parsedPage, perPage: parsedPerPage };
}
