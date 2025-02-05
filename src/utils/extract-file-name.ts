export const extractFilename = (url: string) => {
  const parts = url.split("/");
  return parts[parts.length - 1] || null;
};
