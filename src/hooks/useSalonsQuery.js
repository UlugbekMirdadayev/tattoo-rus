import { salonsApi } from '@/api/salonsApi'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useSalonsQuery = ({
    options = {},
    category = '',
    filters,
}) => {
    const first = options.first ?? 10
    const total = 895

    return useInfiniteQuery(
        ['salons' + category + filters],
        ({ pageParam = 1 }) => {
            const offset = (pageParam - 1) * first

            return salonsApi.getSalons({ ...options, offset, first })
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
