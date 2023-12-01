import { cities } from '@/data/cities'
import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        cart: [],
        modal: null,
        modalData: {},
        plot: [],

        subdomain: '',
        city: null,
        mobileMenu: false,
        salonsFilters: [],
        slidedataIds: [],
        newWorks: false,
        filterYear: null,
    },
    reducers: {
        setNewWorks(state, action) {
            state.newWorks = action.payload
        },
        setSlidedataIds(state, action) {
            state.slidedataIds = action.payload
        },
        setFilterYear(state, action) {
            state.filterYear = action.payload
        },
        setSubdomain(state, action) {
            state.subdomain = action.payload
            state.city = cities.find((i) => i.url == action.payload)
        },
        setModal(state, action) {
            if (action.payload) {
                state.modal = action.payload.id
                state.modalData[action.payload.id] = action.payload.data
                state.modalData.getPlot = action.payload.getPlot
            } else {
                state.modal = null
            }
        },
        setPlot(state, action) {
            state.plot = action.payload
        },
        cartAdd(state, action) {
            // state.cart = action.payload
        },
        cartDelete(state, action) {
            // state.cart = action.payload
        },
        setMobileMenu(state, action) {
            state.mobileMenu = action.payload
        },
        setFilters(state, action) {
            state.salonsFilters = action.payload
        },
    },
})

export const {
    cartAdd,
    cartDelete,
    setModal,
    setSlidedataIds,
    setFilterYear,
    setMobileMenu,
    setFilters,
    setSubdomain,
    setNewWorks,
    setPlot
} = rootSlice.actions
export default rootSlice.reducer
