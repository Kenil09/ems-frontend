import { api } from './api';

export const designationApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getDesignations: builder.query({
            query: () => 'designations',
            providesTags: ['designations']
        }),
        addDesignation: builder.mutation({
            query(payload) {
                return {
                    url: `designations`,
                    method: 'post',
                    body: payload
                };
            },
            invalidatesTags: ['designations']
        }),
        updateDesignation: builder.mutation({
            query: ({ id, data }) => {
                console.log(data, 'Data');
                return {
                    url: `designations/${id}`,
                    method: `put`,
                    body: data
                };
            },
            invalidatesTags: ['designations']
        }),
        deleteDesination: builder.mutation({
            query: (id) => ({
                url: `designations/${id}`,
                method: `delete`
            }),
            invalidatesTags: ['designations']
        })
    })
});

export const { useAddDesignationMutation, useDeleteDesinationMutation, useUpdateDesignationMutation, useGetDesignationsQuery } =
    designationApi;
