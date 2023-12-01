'use client'

import { setFilters, setModal } from '@/redux/slices/rootSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const Wrapper = styled.div`
    background: white;
    max-width: 420px;
    position: absolute;
    top: 0;
    padding: 30px;
    width: 100%;
    right: 0;
    height: 100%;
`

const Filter = ({
    filter,
    options,
    name,
    setAppliedFilters,
    appliedFilters,
}) => {
    const [active, setActive] = useState(false)

    const action = (i, add) => {
        if (add) {
            setAppliedFilters((prev) => [...prev, i])
        } else {
            setAppliedFilters((prev) =>
                prev.filter((item) => item.code != i.code)
            )
        }
    }

    return (
        <div className={`filter__group ${active ? 'active' : ''}`}>
            <div
                className="filter__group-title pt pb"
                onClick={() => setActive(!active)}
            >
                {name}
            </div>
            <div className="filter__group-data">
                {options.map((filterOption, index) => (
                    <div key={index} className="form__checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value="1"
                                className="checkbox"
                                data-name="3D"
                                defaultChecked={appliedFilters.some(
                                    (i) => i.code == filterOption.code
                                )}
                                onClick={(e) =>
                                    action(
                                        {
                                            filter,
                                            ...filterOption,
                                        },
                                        e.target.checked
                                    )
                                }
                            />
                            {filterOption.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function Filters() {
    const dispatch = useDispatch()
    const filters = useSelector((state) => state.root.modalData.FILTERS)
    const defaultAppliedFilters = useSelector(
        (state) => state.root.salonsFilters
    )
    const [appliedFilters, setAppliedFilters] = useState(defaultAppliedFilters)

    const apply = (e) => {
        e.preventDefault()
        dispatch(setModal(null))
        dispatch(setFilters(appliedFilters))
    }

    return (
        <Wrapper id="filter_filters">
            <div className="popup__inner">
                <h3>Фильтры</h3>
                <form
                    onReset={() => setAppliedFilters([])}
                    onSubmit={apply}
                    name=""
                    className="mt"
                    id="form_filter"
                >
                    {Object.keys(filters).map((filter, i) => {
                        const data = filters[filter]

                        if (data && data.filters.length > 0) {
                            return (
                                <Filter
                                    key={i}
                                    options={data.filters}
                                    filter={filter}
                                    name={data.title}
                                    appliedFilters={appliedFilters}
                                    setAppliedFilters={setAppliedFilters}
                                />
                            )
                        }
                    })}
                    <div className="form__buttons">
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="reset"
                                    className="btn btn--w100 btn--transparent"
                                    value="Сбросить"
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="submit"
                                    className="btn btn--w100"
                                    value="Применить"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Wrapper>
    )
}
