function parseisFavourite(value) {
  if (typeof value === 'string') {
    if (value.toLocaleLowerCase() === 'true') return true;
    if (value.toLocaleLowerCase() === 'false') return false;
  }
  return undefined;
}

const parseContactType = (type) => {
  const allowedTypes = ['work', 'home', 'personal'];
  return allowedTypes.includes(type) ? type : undefined;
};

export function parseFilterParams(query) {
  const { isFavourite, contactType } = query;

  const parsedIsFavourite = parseisFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
}
