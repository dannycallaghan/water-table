import { ReactNode, memo, useRef } from 'react';
import { ISortOptions } from '../types/types';

const TableColumnSort = memo(function TableColumnSort(props: {
  children: ReactNode;
  values?: Omit<ISortOptions, 'desc'>;
  active?: boolean;
  action: (values: ISortOptions) => void;
}) {
  const { action } = props;
  const desc = useRef<boolean>(true);

  const handleSort = (): void => {
    desc.current = !desc.current;
    const values = {
      ...props.values,
      desc: desc.current,
    };
    action(values as never);
  };

  return (
    <div
      className="flex cursor-pointer flex-row items-center gap-1"
      onClick={handleSort}
    >
      {props.children}
      <div className={`${props.active ? 'visible' : 'invisible'}`}>
        {desc.current ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        )}
      </div>
    </div>
  );
});

export default TableColumnSort;
