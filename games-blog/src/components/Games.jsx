import GameCard from '@components/GameCard.jsx'
import GameModal from '@components/GameModal.jsx';

import PropTypes from 'prop-types';
import { useState } from 'react';

Games.propTypes = {
    games: PropTypes.array.isRequired,
};

function Games({ games }) {

    const [modalOpen, setModalOpen] = useState(false)
    const [clickedGame, setClickedGame] = useState()

    const openModal = (index) => {
        setModalOpen(true)
        setClickedGame(index)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className="gamesContainer">
            {games.map((game, index) => (
                <div key={index} >
                    <GameCard
                        key={index}
                        gameNum={index}
                        title={game.title}
                        genre={game.genre}
                        gameDescription={game.game_description}
                        mainPlatform={game.main_platform}
                        multiplayerSupport={game.multiplayer_support}
                        onlineFeatures={game.online_features}
                        openModal={openModal}
                    />
                </div>
            ))}
            { modalOpen ? (<GameModal isOpen={modalOpen} onClose={closeModal} game={games[clickedGame]} />) : (<></>)}
        </div>
    );
}

export default Games