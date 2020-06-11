import fetch from 'node-fetch';
import { socrataAppToken } from '..';
import { TQuery } from './acris/types';

const baseUrl = 'https://data.cityofnewyork.us/resource';

export const get = async (endpoint: string) => {
    return fetch(`${baseUrl}/${endpoint}`, {
        method: 'GET',
        headers: { 'X-App-Token': socrataAppToken },
    }).then((res) => res.json());
};

export const submitQuery = (resource: string, query: TQuery) => {
    const queryStringified = reduceQuery(query);
    return get(`${resource}.json?${queryStringified}`);
};

export const reduceQuery = (query: TQuery): string =>
    Object.entries(query).reduce(
        (str, [queryKeyword, queryContent]) =>
            queryContent
                ? `${str}&$${queryKeyword}=${encodeURIComponent(queryContent)}`
                : str,
        ''
    );
