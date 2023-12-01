import WorksGridByMaster from '@/app/works/WorksGridByMaster'
import WorksGridBySalon from '@/app/works/WorksGridBySalon'
import { setModal } from '@/redux/slices/rootSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

const WorkSalon = ({ filters, years, selected, handleChange, worksQuery, masterId, salonId}) => {
    const dispatch = useDispatch()

    return (
        <div className="tabs-data__content" data-id="1">
            <div className="">
                <div className="col-3 col-md-2 col-lg-2 col-xl-2 p-0">
                    {filters.length != 0 && (
                        <div className="">
                            <span
                                onClick={() =>
                                    dispatch(
                                        setModal({
                                            id: 'FILTERS',
                                            data: filters,
                                        })
                                    )
                                }
                                className="btn btn--w100 btn--transparent filter__filters"
                            >
                                Фильтры
                            </span>
                        </div>
                    )}
                </div>
                <div className="col-md-6 col-lg-6 offset-lg-3 mb p-0">
                    <select
                        name=""
                        className="select"
                        value={selected}
                        onChange={handleChange}
                    >
                        {years ? ["За все время",...years]?.map((item, index) => {
                            return (
                                <>
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                </>
                            )
                        }) : "" }
                    </select>
                </div>
            </div>
            <WorksGridBySalon masterId ={masterId} salonId={salonId} worksQuery={worksQuery} />
            <div className="row align-items-center">
                <div className="col-12 mt">
                    <button
                        className="btn btn--w100 works-more"
                        style={
                            worksQuery.hasNextPage ? {} : { display: 'none' }
                        }
                        onClick={() => {
                            if (worksQuery.hasNextPage) {
                                worksQuery.fetchNextPage()
                            }
                        }}
                    >
                        Показать ещё
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WorkSalon
