import GameCard from '@components/GameCard.jsx'

import PropTypes from 'prop-types';

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

export default Games