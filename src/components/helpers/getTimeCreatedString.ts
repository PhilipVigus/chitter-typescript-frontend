const getTimeCreatedString = (timeCreated: string): string => {
  const date = new Date(timeCreated);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
};

export default getTimeCreatedString;
