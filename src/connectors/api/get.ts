import fetch from 'node-fetch';
import { socrataAppToken } from '../..';

const baseUrl = 'https://data.cityofnewyork.us/resource';

export const get = async (endpoint: string) =>
    fetch(`${baseUrl}/${endpoint}`, {
        method: 'GET',
        headers: { 'X-App-Token': socrataAppToken },
    }).then((res) => res.json());
