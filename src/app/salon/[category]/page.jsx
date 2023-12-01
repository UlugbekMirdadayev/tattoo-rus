import { mastersApi } from '@/api/mastersApi'
import { salonsApi } from '@/api/salonsApi'
import ProfileSalon from '@/components/Profile/ProfileSalon'

export default async function Salon(props) {
    const { searchParams, params } = props
    const salon = await salonsApi.getSalon(params.category)
    return <ProfileSalon salon={salon} {...props} />
}
