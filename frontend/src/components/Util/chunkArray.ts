const chunkArray = (list: string[], chunk: number): string[][] => {
  const result = [];

  for (let i = 0; i < list.length; i += chunk) {
    result.push(list.slice(i, i + chunk));
  }

  return result;
};

export default chunkArray;
