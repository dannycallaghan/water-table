import { ReactNode, memo, useCallback, useState } from 'react';
import { formatDateTime, getDataCoords } from '../../lib/utils';
import {
  IGetMessageDataValues,
  IMessage,
  IMessageDataOptions,
  IMessages,
  ISortOptions,
} from '../../types/types';
import MessageDirectionIcon from './MessageDirectionIcon';
import TableColumnSort from '../TableColumnSort';
import TablePaginationControl from '../TablePaginationControl';
import DateRangePicker from '../DateRangePicker';
import SearchBox from '../SearchBox';
import Modal from '../Modal';
import MessageDetails from './MessageDetails';
import FilterReset from '../FilterReset';
import BackToTop from '../BackToTop';
import useGetMessageData, {
  defaultMessageDataOptions,
} from '../../hooks/useGetMessageData';
import GoogleMap from '../GoogleMap';
import RiverState from '../RiverState';

interface IProps {
  source: IMessages;
  showMap: boolean;
}

function MessageTable(props: IProps) {
  const { source, showMap } = props;

  const [messageDataOptions, setMessageDataOptions] =
    useState<IMessageDataOptions>(defaultMessageDataOptions);

  const {
    initialMessagesLength,
    filteredMessagesLength,
    messages,
  }: IGetMessageDataValues = useGetMessageData(source, messageDataOptions);

  const handlePaginationChange = useCallback(function handlePaginationChange(
    page: number,
    itemsPerPage: number
  ) {
    setMessageDataOptions((prev: IMessageDataOptions) => {
      const newPage = prev.pagination.itemsPerPage === itemsPerPage ? page : 1;
      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          page: newPage,
          itemsPerPage: itemsPerPage || prev.pagination.itemsPerPage,
        },
      };
    });
  }, []);

  const handleSearch = useCallback(function handleSearch(value: string) {
    setMessageDataOptions((prev: IMessageDataOptions) => ({
      ...prev,
      searchTerm: value,
      pagination: defaultMessageDataOptions.pagination,
    }));
  }, []);

  const handleDateChange = useCallback(function handleDateChange(
    startDate: string,
    endDate: string
  ) {
    setMessageDataOptions((prev: IMessageDataOptions) => ({
      ...prev,
      filter: {
        filterBy: 'date',
        filterValue: [startDate, endDate],
      },
      pagination: defaultMessageDataOptions.pagination,
      searchTerm: defaultMessageDataOptions.searchTerm,
    }));
  }, []);

  const handleSort = useCallback(function handleSort(values: ISortOptions) {
    setMessageDataOptions((prev: IMessageDataOptions) => ({
      ...prev,
      sortBy: { ...values },
    }));
  }, []);

  const handleReset = useCallback(function handleReset() {
    setMessageDataOptions(defaultMessageDataOptions);
  }, []);

  return (
    <>
      {showMap && (
        <div className="mb-4">
          <GoogleMap
            pins={filteredMessagesLength ? getDataCoords(messages) : []}
            height="225px"
            width="100%"
            zoom={5}
          />
        </div>
      )}
      <hr className="mb-6 mt-8 h-px border-0 bg-slate-300" />
      <div className="mb-4 flex flex-grow flex-row gap-4">
        <div>
          <TablePaginationControl
            initialDataLength={initialMessagesLength}
            dataLength={messages.length}
            options={{ ...messageDataOptions.pagination }}
            hideDisplaySelect={false}
            filteredDataLength={filteredMessagesLength}
            handlePaginationChange={handlePaginationChange}
          />
        </div>
        <div className="flex flex-grow flex-row justify-end gap-4">
          <SearchBox
            term={messageDataOptions.searchTerm}
            handleSearch={handleSearch}
          />
          <DateRangePicker handleDateChange={handleDateChange} />
          <FilterReset handleReset={handleReset} />
        </div>
      </div>
      <table className="min-w-full table-fixed">
        <caption className="sr-only">Message Table</caption>
        <thead>
          <tr className="border-b border-solid border-slate-300">
            <TH
              sortAction={handleSort}
              sortValues={{ type: 'date', key: 'transmittedAt' }}
              sortActive={messageDataOptions.sortBy.key === 'transmittedAt'}
            >
              Received (UTC)
            </TH>
            <TH
              sortAction={handleSort}
              sortValues={{ type: 'string', key: 'sensorId' }}
              sortActive={messageDataOptions.sortBy.key === 'sensorId'}
            >
              Identifier
            </TH>
            <TH
              sortAction={handleSort}
              sortValues={{ type: 'string', key: 'direction' }}
              sortActive={messageDataOptions.sortBy.key === 'direction'}
              classes="hidden md:table-cell"
            >
              Direction
            </TH>
            <TH classes="hidden md:table-cell">State</TH>
            <TH
              sortAction={handleSort}
              sortValues={{ type: 'number', key: 'bytes' }}
              sortActive={messageDataOptions.sortBy.key === 'bytes'}
              classes="hidden sm:table-cell"
            >
              Size
            </TH>
            <TH classes="hidden lg:table-cell">Payload</TH>
          </tr>
        </thead>
        <tbody>
          {messages.length < 1 ? (
            <tr>
              <TD span={5}>
                No messages have been received. Please try again later.
              </TD>
            </tr>
          ) : (
            <>
              {messages.map((row: IMessage) => (
                <TR key={row.payload} message={row}>
                  <TD classes="whitespace-nowrap">
                    {formatDateTime(row.transmittedAt.iso)}
                    <dl className="flex flex-row items-center sm:hidden">
                      <dt className="sr-only">Direction</dt>
                      <dd className="inline">
                        <MessageDirectionIcon direction={row.direction} />
                      </dd>
                      <dt className="sr-only">Size</dt>
                      <dd className="inline">{row.bytes} B</dd>
                    </dl>
                  </TD>
                  <TD classes="truncate max-w-[200px] xs:max-w-none">
                    {row.sensorId}
                  </TD>
                  <TD classes="hidden md:table-cell">
                    <MessageDirectionIcon direction={row.direction} />
                  </TD>
                  <TD classes="hidden sm:table-cell whitespace-nowrap">
                    <RiverState state={row.decodedPayload?.state as string} />
                  </TD>
                  <TD classes="hidden sm:table-cell whitespace-nowrap">
                    {row.bytes} B
                  </TD>
                  <TD classes="hidden lg:table-cell truncate lg:max-w-sm">
                    {row.payload}
                  </TD>
                </TR>
              ))}
            </>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex flex-row">
        <div className="basis-1/2">
          <TablePaginationControl
            initialDataLength={initialMessagesLength}
            dataLength={messages.length}
            hideDisplaySelect
            options={{ ...messageDataOptions.pagination }}
            filteredDataLength={filteredMessagesLength}
            handlePaginationChange={handlePaginationChange}
          />
        </div>
        <div className="basis-1/2">
          <div className="flex justify-end">
            <BackToTop />
          </div>
        </div>
      </div>
    </>
  );
}

const TR = memo(function TR(props: {
  children: ReactNode;
  message?: IMessage;
}) {
  const [showMessageDetails, setShowMessageDetails] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setShowMessageDetails((prev) => !prev);
  }, []);

  return (
    <>
      <tr
        onClick={handleClick}
        className="cursor-pointer border-b border-solid border-slate-300 text-gray-500 hover:bg-slate-300 hover:text-gray-700"
      >
        {props.children}
      </tr>
      {showMessageDetails && (
        <Modal>
          <MessageDetails
            handleClose={setShowMessageDetails}
            message={props.message as IMessage}
          />
        </Modal>
      )}
    </>
  );
});

const TH = memo(function TH(props: {
  children: ReactNode;
  sortAction?: (values: ISortOptions) => void;
  sortValues?: Omit<ISortOptions, 'desc'>;
  sortActive?: boolean;
  classes?: string;
  span?: number;
  scope?: string;
}) {
  const canSort =
    typeof props.sortValues !== 'undefined' &&
    typeof props.sortAction === 'function';

  return (
    <th
      colSpan={props.span || 1}
      scope={props.scope || 'col'}
      className={`p-2 text-left text-sm font-semibold text-gray-900 first:pl-0 last:pr-0  ${props.classes || ''}`}
    >
      {canSort ? (
        <TableColumnSort
          action={props.sortAction as (values: ISortOptions) => void}
          values={props.sortValues}
          active={props.sortActive}
        >
          {props.children}
        </TableColumnSort>
      ) : (
        <>{props.children}</>
      )}
    </th>
  );
});

const TD = memo(function TD(props: {
  children: ReactNode;
  classes?: string;
  align?: string;
  span?: number;
}) {
  const textAlign = `text-${props.align || 'left'}`;
  return (
    <td
      colSpan={props.span || 1}
      className={`p-2 ${textAlign} text-sm first:pl-0 last:pr-0 ${props.classes || ''}`}
    >
      {props.children}
    </td>
  );
});

export default MessageTable;
