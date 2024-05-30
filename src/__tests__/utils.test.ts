import sensorData from '../data/river-sensor-data-test.json';
import { expect, test, describe } from 'vitest';
import { b64DecodeUnicode, compareISODates, filterByDate, formatDateTime, getDataCoords, isBetweenISODates, parseJWT } from '../lib/utils';

describe('compareISODates', () => {
  test('comparing an earlier date to a later date should return a negative number', () => {
    expect(compareISODates('2024-04-30T10:11:13.009Z', '2024-05-30T10:11:13.009Z')).toBeLessThan(0);
  })
})

describe('compareISODates', () => {
  test('comparing a later date to an ealier date should return a positive number', () => {
    expect(compareISODates('2024-05-30T10:11:13.009Z', '2024-04-30T10:11:13.009Z')).toBeGreaterThan(1);
  })
})

describe('isBetweenISODates', () => {
  test('show return true if a passed date is between a range of dates', () => {
    expect(isBetweenISODates('2024-05-30T10:11:13.009Z', ['2024-04-30T10:11:13.009Z', '2024-06-30T10:11:13.009Z'])).toBeTruthy();
  })
})

describe('isBetweenISODates', () => {
  test('show return false if a passed date is not between a range of dates', () => {
    expect(isBetweenISODates('2024-02-30T10:11:13.009Z', ['2024-04-30T10:11:13.009Z', '2024-06-30T10:11:13.009Z'])).toBeFalsy();
  })
})

describe('filterByDate', () => {
  test('should filter messages to show those within a date range', () => {
    expect(filterByDate(sensorData, ['2020-08-29T10:11:13.009Z', '2020-10-02T10:11:13.009Z'])).toHaveLength(5);

    expect(filterByDate(sensorData, ['2023-01-29T10:11:13.009Z', '2023-02-02T10:11:13.009Z'])).toHaveLength(0);
  })
})

describe('formatDateTime', () => {
  test('should return a user friendly date', () => {
    expect(formatDateTime('2024-01-29T10:11:13.009Z')).toBe('29 Jan 2024 10:11:13');
  })
})

const decodedToken = '{"temperature":{"value":3,"unit":"C"},"height":{"value":"4.13","unit":"M"},"speed":{"value":"3.26","unit":"M/s"},"battery":{"value":98,"unit":"%"},"alarm":false,"state":"Rising","oxygen":{"value":50,"unit":"mg/L"}}';

describe('b64DecodeUnicode', () => {
  test('should decode a JWT token', () => {
    expect(b64DecodeUnicode(sensorData[0].payload)).toBe(decodedToken);
  })
})

describe('parseJWT', () => {
  test('should return a decoded JWT token as JSON', () => {
    expect(parseJWT(sensorData[0].payload)).toStrictEqual(JSON.parse(decodedToken));
  })
})

describe('getDataCoords', () => {
  test('should return an array of objects containing the latitude, longitude, and sensorId from an array of messages', () => {
    const result = [
      {
        lat: '51.205424',
        lng: '-1.369337',
        sensorId: '821ef78d-4b53-4bf4-83d5-686ad81deb48'
      },
      {
        lat: '51.736449',
        lng: '-4.049007',
        sensorId: 'ea7e3611-a61f-4e6d-996d-063a2e890195'
      },
      {
        lat: '51.513289',
        lng: '-0.121575',
        sensorId: 'c129d49e-a858-40d2-9945-0bb71b50971b'
      }
    ];
    expect(getDataCoords(sensorData.slice(0, 3))).toStrictEqual(result);
  })
})

