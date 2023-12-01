import { createEffect } from 'effector'
import api from './axiosClient'

export const signInFx = createEffect(async ({ url }) => {
    const { data } = await api.get(url)
    return { data }
})
