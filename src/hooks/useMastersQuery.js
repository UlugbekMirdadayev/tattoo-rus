import { mastersApi } from '@/api/mastersApi'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useMastersQuery = ({options = {}, category = '', filters}) => {
    const first = options.first ?? 10
    const total = 2289

    return useInfiniteQuery(
        ['masters' + category + filters],
        ({ pageParam = 1 }) => {
            const offset = (pageParam - 1) * first

            return mastersApi.getMasters({ ...options, offset, first })
        },
        {
            getNextPageParam: (lastPage, allPages) => {
                const offset = (allPages.length - 1) * first
                const page = Math.ceil(offset / first) + 1
                const totalPages = Math.ceil(total / first)

                if (lastPage.data.length < 10) {
                    return false
                }

                if (page < totalPages) {
                    return page + 1
                } else {
                    return false
                }
            },
        }
    )
}
