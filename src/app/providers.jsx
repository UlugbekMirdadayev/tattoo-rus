'use client'

import store from '@/redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { Provider } from 'react-redux'

export default function Providers({ children }) {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Provider>
    )
}
