import { mastersApi } from '@/api/mastersApi'
import Profile from '@/components/Profile/Profile'

export default async function Master(props) {
    const { searchParams, params } = props
    const master = await mastersApi.getMaster(params.category)

    return <Profile master={master} {...props} />
}
