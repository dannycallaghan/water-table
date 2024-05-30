import { memo, useCallback } from 'react';
import { IPaginationOptions } from '../types/types';

const TablePaginationControl = memo(function TablePaginationControl(props: {
  dataLength: number;
  initialDataLength: number;
  options: IPaginationOptions;
  hideDisplaySelect: boolean;
  filteredDataLength: number;
  handlePaginationChange: (page: number, itemsPerPage: number) => void;
}) {
  const { initialDataLength, handlePaginationChange } = props;
  const {
    options: { page, itemsPerPage },
    filteredDataLength,
  } = props;

  const handleDisplay = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const maxPages = Math.ceil(
        initialDataLength / Number(event.target.value)
      );
      let paged = page;
      if ((page as number) > maxPages) {
        paged = maxPages;
      }
      handlePaginationChange(paged, Number(event.target.value));
    },
    [handlePaginationChange, initialDataLength, page]
  );

  const handlePaging = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const pageData = event.currentTarget.dataset['page'];
    const currentPage = props.options.page as number;
    let page;
    switch (pageData) {
      case 'prev':
        page = currentPage - 1;
        break;
      case 'next':
        page = currentPage + 1;
        break;
      default:
        page = Number(pageData);
    }
    if (page < 1) page = 1;
    if (page > Math.ceil(initialDataLength / itemsPerPage)) {
      page = Math.ceil(initialDataLength / itemsPerPage);
    }
    handlePaginationChange(page, itemsPerPage);
  };

  const setButtonState = useCallback(
    (index: number) => {
      const maxPages = Math.ceil(initialDataLength / itemsPerPage);
      const diffBefore = page === maxPages ? 2 : 1;
      const diffAfter = page === 1 ? 2 : 1;

      if (index === page) {
        return 'bg-[#063360] text-white';
      }
      if (index < page - diffBefore || index > page + diffAfter) {
        return 'hidden';
      }
      return 'bg-white';
    },
    [page, initialDataLength, itemsPerPage]
  );

  const getItemInfo = useCallback(() => {
    const lastItem = page * itemsPerPage;
    let lastItemShowing = lastItem;
    if (lastItemShowing > filteredDataLength) {
      lastItemShowing = filteredDataLength;
    }
    const firstItem = lastItem - itemsPerPage;
    return `SHOWING ${firstItem + 1} - ${lastItemShowing} of ${filteredDataLength}`;
  }, [page, itemsPerPage, filteredDataLength]);

  return (
    <>
      <div className="flex flex-row items-center gap-4">
        {!props.hideDisplaySelect && (
          <div className="flex max-w-max flex-col">
            <label
              htmlFor="display-items"
              className="text-[0.7rem] text-gray-400"
            >
              ITEMS PER PAGE
            </label>
            <select
              id="display-items"
              onChange={handleDisplay}
              value={itemsPerPage}
              className="h-8 rounded border border-solid border-slate-300 p-1 text-[0.7rem] text-slate-600 focus-visible:border-slate-300"
            >
              <option value={10}>10</option>
              {initialDataLength > 50 && <option value={50}>50</option>}
              {initialDataLength > 100 && <option value={100}>100</option>}
              {initialDataLength > 500 && <option value={500}>500</option>}
              {initialDataLength > 1000 && <option value={1000}>1000</option>}
              {initialDataLength <= 1000 && (
                <option value={initialDataLength}>All</option>
              )}
            </select>
          </div>
        )}
        <div>
          <p className="text-[0.7rem] uppercase text-gray-400">
            PAGE {page} OF {Math.ceil(filteredDataLength / itemsPerPage)}
          </p>
          <div className="flex flex-row items-center gap-1">
            <button
              disabled={page === 1}
              data-page="prev"
              className="inline-block aspect-square w-8 rounded border border-slate-300 bg-white text-xs disabled:text-slate-300"
              onClick={handlePaging}
            >
              &lt;
            </button>
            {Array.from(
              {
                length: Math.ceil(filteredDataLength / itemsPerPage),
              },
              (_, index) => (
                <button
                  data-page={index + 1}
                  className={`${setButtonState(index + 1)} inline-block aspect-square w-8 rounded border border-slate-300 text-xs disabled:text-slate-300`}
                  key={index + 1}
                  onClick={handlePaging}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              disabled={page === Math.ceil(filteredDataLength / itemsPerPage)}
              data-page="next"
              className="inline-block aspect-square w-8 rounded border border-slate-300 bg-white text-xs disabled:text-slate-300"
              onClick={handlePaging}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <p className="mt-1 text-[0.7rem] text-gray-400">{getItemInfo()}</p>
    </>
  );
});

export default TablePaginationControl;
