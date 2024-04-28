import '@style/Home.css'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import GameCard from '@components/GameCard.jsx'
import Empty from '@components/Empty';
import Loading from '@components/Loading';
import NoResponse from '@components/NoResponse';

import useApi from '@hooks/useApi';

Games.propTypes = {
    games: PropTypes.array.isRequired,
};

function Games({ games }) {
    return (
        <div className="gamesContainer">
            {games.map((game, index) => (
            <GameCard
                key={index}
                title={game.title}
                genre={game.genre}
                gameDescription={game.game_description}
                mainPlatform={game.main_platform}
                multiplayerSupport={game.multiplayer_support}
                onlineFeatures={game.online_features}
                />))}
        </div>
    );
}

function Home() {
    const { getGames } = useApi()
    const [videogames, setVideogames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);


    useEffect(() => {
        getGames(setVideogames, setIsEmpty, setError, setLoading);
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
                <NoResponse />
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

    return (
        <div>
            <Games games={videogames} />    
        </div>
    );
}

export default Home