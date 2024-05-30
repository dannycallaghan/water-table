import { IMessage, IMessages } from '../types/types';
import { LOCALE } from './globals';

export function compareISODates(str1: string, str2: string): number {
  return new Date(str1).valueOf() - new Date(str2).valueOf();
}

export function isBetweenISODates(target: string, range: string[]): boolean {
  return compareISODates(target, range[0]) > 0
    && compareISODates(target, range[1]) < 0;
}

export function filterByDate(data: IMessages, range: string[]): IMessages {
  if (!Array.isArray(range)) return data;
  if (range.length < 2) return data;
  return data.filter(message => isBetweenISODates(message.transmittedAt.iso, range))
}

export function formatDateTime(datetime: string) {
  const stringAsDate: Date = new Date(datetime);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = stringAsDate.toLocaleDateString(LOCALE, options);
  const time = stringAsDate.toLocaleTimeString(LOCALE);
  return `${date} ${time}`;
}

export function b64DecodeUnicode(str: string) {
  return decodeURIComponent(
    Array.prototype.map
      .call(
        atob(str),
        (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      )
      .join('')
  );
}

export function parseJWT(token: string) {
  return JSON.parse(b64DecodeUnicode(token));
}

export function getDataCoords(data: IMessages) {
  return data.map((item: IMessage) => ({
    lat: item.latitude,
    lng: item.longitude,
    sensorId: item.sensorId,
  }));
}
