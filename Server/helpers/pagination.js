const paginate = (array, page) => {
  const index = ((page * 1) - 1) * 10;
  const endIndex = (page * 10);
  const pages = Math.ceil(array.length / 10);
  const totalEntries = array.length;
  const entriesOnPage = array.slice(index, endIndex);
  const numEntriesOnPage = entriesOnPage.length;
  return {
    page, numberOfPages: pages, entriesOnPage: numEntriesOnPage, totalEntries, entries: entriesOnPage,
  };
};
export default paginate;
