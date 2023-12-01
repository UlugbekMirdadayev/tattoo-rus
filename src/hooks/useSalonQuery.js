import { salonApi } from '@/api/salonApi'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useSalonQuery = ({options = {}, category = '', filters , total}) => {
    const first = options.first ?? 12
    return useInfiniteQuery(
        ['salon' + category + filters],
        async({ pageParam = 1 }) => {
            const offset = (pageParam - 1) * first
            const res = await salonApi.getSalon({ ...options, offset, first })
            return  res
        },
        {
            getNextPageParam: (lastPage, allPages) => {

                const offset = (allPages.length - 1) * first
                const page = Math.ceil(offset / first) + 1
                const totalPages = Math.ceil(total / first)

                if (lastPage?.worksData?.data?.length < 10) {
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
