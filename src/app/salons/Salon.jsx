import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModal, setSlidedataIds } from '@/redux/slices/rootSlice';
import { worksApi } from '@/api/worksApi';
import { salonApi } from '@/api/salonApi';
import { masterApi } from '@/api/masterApi';
import SalonLink from './SalonLink';
import SalonCity from './SalonCity';
import Link from 'next/link';

const Salon = ({ data }) => {
    const dispatch = useDispatch();
    const [work, setWork] = useState(null);
    const [workId, setWorkId] = useState(null);
    const [photoId, setPhotoId] = useState('');
    const workCount = data?.works?.data?.length;

    const getWorks = async () => {
        const res = await worksApi.getWork({ id: workId });
        setWork(res);
    };

    const getMasterWorksID = async () => {
        const res = await masterApi.getMasterWorksID({
            id: data.master_id,
            first: workCount,
        });
        setPhotoId(res);
    };

    const getSalonWorksId = async () => {
        const res = await salonApi.getSalonWorksId({
            id: data.salon_id,
            first: workCount,
        });
        setPhotoId(res);
    };

    useEffect(() => {
        getSalonWorksId();
        getMasterWorksID();
        if (workId) getWorks();
    }, [workId]);

    useEffect(() => {
        if (work) {
            dispatch(
                setModal({
                    id: 'WORK',
                    data: work,
                })
            );
            dispatch(
                setSlidedataIds(photoId.worksData?.data?.map((item) => item.id))
            );
        }
    }, [work]);

    return (
        <div className="card-line">
            <div className="row align-items-center mt">
                <div className="col-12 col-lg-4 mb">
                    <SalonLink salonLink={data.url} salonCity={data.city}>
                        <div className="author__image">
                            <div
                                className="author__photo ibg"
                                style={{
                                    backgroundImage: `url(${data.logo})`,
                                }}
                            ></div>
                        </div>
                        <div className="author__data">
                            <SalonCity city={data.city} />
                            <div className="author__name">{data.name}</div>
                            <div className="author__desc">{data.pagetitle}</div>
                        </div>
                    </SalonLink>
                </div>
                <div className="col-12 col-lg-6 mb">
                    <div className="card-line__photos">
                        {data.works?.data?.map((i) => (
                            <div
                                key={i.id}
                                className="card-line__photo ibg"
                                data-fancybox="masters_top_1"
                                data-options='{"url":"/ajax-work-1-1.html"}'
                                data-type="ajax"
                                onClick={() => {
                                    setWorkId(i.id);
                                }}
                                data-src="_source/ajax-work-1-1.html"
                                style={{ backgroundImage: `url(${i.photo_s})` }}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="col-12 col-lg-2 mb text-align-right">
                    <Link href={data.url} className="link-all link-all--dark">
                        {data.worksCount ?? 0} работ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Salon;
