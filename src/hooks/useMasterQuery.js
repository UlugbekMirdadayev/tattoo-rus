import { masterApi } from '@/api/masterApi'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useMasterQuery = ({options = {}, category = '', filters , total}) => {
    const first = options.first ?? 12
    return useInfiniteQuery(
        ['master' + category + filters],
        ({ pageParam = 1 }) => {
            const offset = (pageParam - 1) * first
            return masterApi.getMaster({ ...options, offset, first })
        },
        {
            getNextPageParam: (lastPage, allPages) => {

                const offset = (allPages.length - 1) * first
                const page = Math.ceil(offset / first) + 1
                const totalPages = Math.ceil(total / first)

                if (lastPage?.worksData?.data?.length < 12) {
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
