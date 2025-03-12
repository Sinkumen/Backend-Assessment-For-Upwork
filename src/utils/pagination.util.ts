const getPagination = (page: any, limit: any, totalItems: number) => {
  const currPage = parseInt(page as string, 10) || 1;
  const limitNeeded = parseInt(limit as string, 10) || 5;
  const startIndex = (currPage - 1) * limitNeeded;
  const endIndex = currPage * limitNeeded;
  const totalPages = Math.ceil(totalItems / limitNeeded);
  const pagination: any = {};
  if (endIndex < totalPages) {
    pagination.next = {
      page: currPage + 1,
      limit: limitNeeded,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: currPage - 1,
      limit: limitNeeded,
    };
  }
  return {
    startIndex,
    endIndex,
    totalPages,
    pagination,
  };
};

export default getPagination;
