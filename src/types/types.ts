export type MessageFilters = 'direction' | 'date' | '';

export interface ISortOptions {
  type: string;
  key: string;
  desc: boolean;
}

export interface IPaginationOptions {
  itemsPerPage: number;
  page: number;
}

export interface IMessageDataOptions {
  searchTerm: string;
  filter: {
    filterBy: MessageFilters;
    filterValue: string | string[];
  }
  pagination: IPaginationOptions;
  sortBy: ISortOptions;
}

interface IMessagePayload {
    temperature: {
      value?: number;
      unit: string;
    };
    height: {
      value?: string;
      unit: string;
    };
    speed: {
      value?: string;
      unit: string;
    };
    battery: {
      value?: number;
      unit: string;
    };
    alarm: boolean;
    state: string;
    oxygen: {
      value?: number;
      unit: string;
    };
}

export interface IMessage {
  id: string;
  direction: string;
  transmittedAt: {
    unix: number;
    iso: string;
  }
  latitude: string;
  longitude: string;
  sensorId: string;
  payload: string;
  bytes: number;
  decodedPayload?: IMessagePayload;
}

export interface IGetMessageDataValues {
  messages: IMessages;
  filteredMessagesLength: number;
  initialMessagesLength: number;
}

export type IMessages = IMessage[];
