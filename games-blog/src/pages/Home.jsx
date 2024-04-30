import '@style/Home.css'
import { useState, useEffect, Suspense, lazy } from 'react'


import Empty from '@components/Empty';
import Loading from '@components/Loading';
import NoResponse from '@components/NoResponse';
import Auth from '@components/Auth';

import useApi from '@hooks/useApi';
import useToken from '@hooks/useToken';


const Games = lazy(() => import('@components/Games'));

function Home() {
    const { getGames } = useApi();
    const { token } = useToken();
    const [videogames, setVideogames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [noAuth, setNoAuth] = useState(false)


    useEffect(() => {
        getGames(setVideogames, setIsEmpty, setError, setLoading, setNoAuth, token);
    }, []);

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <NoResponse/>
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div>
                <Empty />
            </div>
        );
    }

    if(noAuth){
        return (
            <div>
                <Auth/>
            </div>
        )

    }

    return (
        <Suspense fallback={<Loading />}>
            <Games games={videogames} />
        </Suspense>
    );
}

export default Home