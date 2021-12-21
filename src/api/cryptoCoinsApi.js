import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const apiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '0277267be6msh4c5e64d44e46a4dp143884jsn4ccfddf3eb87'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

export const cryptoApi = createApi()