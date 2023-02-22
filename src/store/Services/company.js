import { api } from './api';

export const companyApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCompanies: builder.query({
            query: () => 'company',
            providesTags: ['company']
        }),
        addCompany: builder.mutation({
            query(payload) {
                return {
                    url: `company`,
                    method: 'post',
                    body: payload
                };
            },
            invalidatesTags: ['company']
        }),
        updateCompany: builder.mutation({
            query: (payload) => {
                const { data, id } = payload;
                return {
                    url: `company/${id}`,
                    method: `put`,
                    body: data
                };
            },
            invalidatesTags: ['company']
        }),
        deleteCompany: builder.mutation({
            query: (id) => ({
                url: `company/${id}`,
                method: `delete`,
                body: {}
            }),
            invalidatesTags: ['company']
        })
    })
});

export const { useGetCompaniesQuery, useAddCompanyMutation, useUpdateCompanyMutation, useDeleteCompanyMutation } = companyApi;
