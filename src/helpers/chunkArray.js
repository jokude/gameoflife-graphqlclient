const chunkArray = (array, chunkSize) => {
  let results = [];
  while (array.length) {
    results.push(array.splice(0, chunkSize));
  }
  return results;
}

export default chunkArray;