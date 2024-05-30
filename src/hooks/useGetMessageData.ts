import { filterByDate, compareISODates } from '../lib/utils';
import { IMessages, IMessageDataOptions, IMessage, IGetMessageDataValues } from '../types/types';

export const defaultMessageDataOptions: IMessageDataOptions = {
  searchTerm: '',
  filter: {
    filterBy: '',
    filterValue: '',
  },
  pagination: {
    itemsPerPage: 100,
    page: 1,
  },
  sortBy: {
    type: 'date',
    key: 'transmittedAt',
    desc: true,
  },
};

function useGetMessageData(
  data: IMessages,
  options: IMessageDataOptions): 
  IGetMessageDataValues {
  let messages = data;

  // Search term
  if (options.searchTerm.length) {
    messages = messages.filter(item => item.sensorId.toLocaleLowerCase().includes(options.searchTerm));
  }

  // Filter
  if (options.filter.filterBy.length) {
    if (options.filter.filterBy === 'date') {
      messages = filterByDate(messages, options.filter.filterValue as string[]);
    }
    if (options.filter.filterBy === 'direction') {
      messages = messages.filter(message => message.direction.toLocaleLowerCase() === (options.filter.filterValue as string).toLowerCase());
    }
  }
  
  // Sort
  messages = messages.sort((a: IMessage, b: IMessage) => {
    switch(options.sortBy.type) {
      case 'number':
        if (options.sortBy.desc) {
          // @ts-expect-error Expecting a number of an arithmetic operation
          return b[options.sortBy.key as keyof IMessage] - a[options.sortBy.key as keyof IMessage];
        }
        // @ts-expect-error Expecting a number of an arithmetic operation
        return a[options.sortBy.key as keyof IMessage] - b[options.sortBy.key as keyof IMessage];
      case 'string':
        if (options.sortBy.desc) {
          // @ts-expect-error Won't allow the use of localeCompare
          return b[options.sortBy.key as keyof IMessage].localeCompare(a[options.sortBy.key as keyof IMessage]);
        }
          // @ts-expect-error Won't allow the use of localeCompare
        return a[options.sortBy.key as keyof IMessage].localeCompare(b[options.sortBy.key as keyof IMessage]);
      default: // date
        if (options.sortBy.desc) {
          return compareISODates(b.transmittedAt.iso, a.transmittedAt.iso);
        }
        return compareISODates(a.transmittedAt.iso, b.transmittedAt.iso);
    }
  });

  // Pagination
  const lastItem = options.pagination.page * options.pagination.itemsPerPage;
  const firstItem = lastItem - options.pagination.itemsPerPage;
  const sliced =  messages.slice(firstItem, lastItem);

  return {
    initialMessagesLength: data.length,
    filteredMessagesLength: messages.length,
    messages: sliced,
  };
}

export default useGetMessageData;
