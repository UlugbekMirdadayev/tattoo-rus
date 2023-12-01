import { worksApi } from '@/api/worksApi'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useWorksQuery = ({options = {}, category = '', filters}) => {
    const first = options.first ?? 24
    const total = 2289

    return useInfiniteQuery(
        ['works' + category + filters + '_' + options.sortBy],
        ({ pageParam = 1 }) => {
            const offset = (pageParam - 1) * first

            return worksApi.getWorks({ ...options, offset, first })
        },
        {
            getNextPageParam: (lastPage, allPages) => {
                const offset = (allPages.length - 1) * first
                const page = Math.ceil(offset / first) + 1
                const totalPages = Math.ceil(total / first)

                if (page < totalPages) {
                    return page + 1
                } else {
                    return false
                }
            },
        }
    )
}
