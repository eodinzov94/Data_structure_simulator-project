import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {AlgorithmReport} from "../../types/AlgorithmReport";
import {GeneralReport} from "../../types/GeneralReport";

// Define a service using a base URL and expected endpoints
export const reportApi = createApi({
    reducerPath: 'reportApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
    endpoints: (builder) => ({
        getAlgorithmReports: builder.query<AlgorithmReport, any>({
            query: () => `/lecturer/report/algo-report`,

        }),
        getGeneralReports: builder.query<GeneralReport, any>({
            query: () => `/lecturer/report/general-report`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAlgorithmReportsQuery, useGetGeneralReportsQuery } = reportApi
