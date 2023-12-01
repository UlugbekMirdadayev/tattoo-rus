"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNewWorks } from '@/redux/slices/rootSlice';
import Title from '@/components/Title';
import Salon from './salons/Salon';
import { salonsApi } from '@/api/salonsApi';
import { mastersApi } from '@/api/mastersApi';
import Link from 'next/link';
import { worksApi } from '@/api/worksApi';
import Work from './works/Work';
import { Grid } from './works/WorksGrid';
import { cities } from '@/data/cities';

export default function Home() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [works, setWorks] = useState([]);
    const [masters, setMasters] = useState([]);
    const [salons, setSalons] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const salonsResponse = await salonsApi.getSalons({ first: 3 });
                setSalons(salonsResponse.data);

                setLoading(false);

                const mastersResponse = await mastersApi.getMasters({ first: 3 });
                setMasters(mastersResponse.data);

                const worksResponse = await worksApi.getWorks({
                    first: 20,
                    sortBy: 'vk_date',
                });
                setWorks(worksResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const host =
            typeof window !== 'undefined' ? window.location.hostname : '';

        const partsWord = host.split('.')[0];
        const parts = cities.find((item) => item.url === partsWord)?.name2;

        let title = `Популярные мастера / Rus.Tattoo`;

        document.title = title;
    }, []);

    if (loading) {
        return null;
    }

    return (
        <>
            {masters.length > 0 && (
                <section className="works">
                    <div className="container">
                        <Title title="Популярные мастера" allLink="/masters" />
                        <div className="card-lines">
                            {masters.map((i) => (
                                <Salon
                                    data={{
                                        ...i,
                                        name: `${i.firstname} ${i.lastname}`,
                                    }}
                                    key={i.id}
                                />
                            ))}
                        </div>
                        <div className="row align-items-center">
                            <div className="col-12 mt">
                                <Link
                                    href="/masters"
                                    className="btn btn--w100 btn--arrow"
                                >
                                    Смотреть все
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {salons.length > 0 && (
                <section className="works">
                    <div className="container">
                        <Title title="Популярные салоны" allLink="/salons" />
                        <div className="card-lines">
                            {salons.map((i) => (
                                <Salon data={i} key={i.id} />
                            ))}
                        </div>
                        <div className="row align-items-center">
                            <div className="col-12 mt">
                                <Link
                                    href="/salons"
                                    className="btn btn--w100 btn--arrow"
                                >
                                    Смотреть все
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <section className="works">
                <div className="container">
                    <Title
                        title="Новые работы"
                        allLink="/works"
                        action={() => dispatch(setNewWorks(true))}
                    />
                    <Grid
                        className="grid"
                        columnClassName="grid-column"
                        breakpointCols={{
                            default: 4,
                            800: 3,
                            500: 2,
                        }}
                    >
                        {works.map((i) => (
                            <Work data={i} key={i.id} id={i.id} newWork={works.length} />
                        ))}
                    </Grid>
                    <div className="row align-items-center">
                        <div className="col-12 mt">
                            <Link
                                href="/works"
                                className="btn btn--w100 btn--arrow"
                                onClick={() => dispatch(setNewWorks(true))}
                            >
                                Смотреть все
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
