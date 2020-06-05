const normalizeSortKey = (sortKey) => sortKey.split('-').join('');

export const getSortConfig = (sortKey) => {
  if (!sortKey) {
    return [];
  }

  const isDescendingOrder = sortKey[0] === '-';
  const order = isDescendingOrder ? 'DESC' : 'ASC';

  return [[normalizeSortKey(sortKey), order]];
};
