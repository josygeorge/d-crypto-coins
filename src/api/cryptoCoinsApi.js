import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiHeaders = {
    'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
}

const baseUrl = process.env.REACT_APP_RAPID_API_URL;

// Utility fn as callback - to pass headers too
const createRequest = (url) => ({
    url,
    headers: apiHeaders
})

export const cryptoCoinsApi = createApi({
    reducerPath: 'cryptoCoinsApi', // A name to specify the reducer path
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoCoins: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoCoinDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoCoinHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history/${timePeriod}`),
        })
    })
});

// custom hook to call by redux tookit automatically in required pages / components 
export const {
    // Add ( prefix 'use' and suffix 'Query') to the endpoints object query above
    useGetCryptoCoinsQuery,
    useGetCryptoCoinDetailsQuery,
    useGetCryptoCoinHistoryQuery,
} = cryptoCoinsApi;