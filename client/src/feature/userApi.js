import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
const baseUrl = `${apiURL}/api/user`;
const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body
            })
        }),
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            })
        }),
        sendOTP: builder.query({
            query: () => ({
                url: '/sendOTP'
            })
        }),
        sendMail: builder.mutation({
            query: (email) => ({
                url: '/sendMail',
                method: 'POST',
                body: email
            })
        }),
        verifyOTP: builder.mutation({
            query: (otp) => ({
                url: '/verifyOTP',
                method: 'POST',
                body: otp
            })
        }),
        updatePassword: builder.mutation({
            query: ({token, ...body}) => ({
                url: `/updatePassword`,
                method: 'PUT',
                body,
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        }),
        matchEmail: builder.mutation({
            query: (email) => ({
                url: '/email',
                method: 'PUT',
                body: email
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useSendOTPQuery, useSendMailMutation, useVerifyOTPMutation, useUpdatePasswordMutation, useMatchEmailMutation } = userApi;
export default userApi;