import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const apiHeaders = {
    'x-rapidapi-host': process.env.RAPID_API_HOST,
    'x-rapidapi-key': process.env.RAPID_API_KEY
}

const baseUrl = RAPID_API_URL;

export const cryptoApi = createApi()