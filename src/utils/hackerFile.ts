const validTypes = ['project'];
const verifyType = (typeField: string): boolean => {
  return validTypes.includes(typeField);
};

const stripQueryParameters = (url: string): string => {
  if (url.indexOf('?') > 0) {
    return url.substring(0, url.indexOf('?'));
  }
  return url;
};

const addRefToURL = (url: string): string => {
  return `${url}?ref=hackerstats`;
};

export { verifyType, addRefToURL, stripQueryParameters };
