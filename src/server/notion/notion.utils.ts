export const getTweetAuthor = (url: string): string => {
  const regexPattern = /\/([^/]+)\/status/;
  const match = url.match(regexPattern);
  return (match ?? [])[1] ?? '"Unknown user"';
};
