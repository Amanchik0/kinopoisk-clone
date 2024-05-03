export const paginate = (array, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return array.slice(startIndex, startIndex + pageSize);
  };
  