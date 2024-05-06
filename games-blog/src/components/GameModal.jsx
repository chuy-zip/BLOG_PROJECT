// GameModal.jsx
import PropTypes from 'prop-types';

GameModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired, 
};

function GameModal({ isOpen, onClose, game }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                <h1>{game.title}</h1>
                <h2>{game.genre}</h2>
                <h3>{game.main_platform}</h3>
                <h3>{game.multiplayer_support}</h3>
                <h3>{game.online_features}</h3>
                <p>{game.game_description}</p>
            </div>
        </div>
    );
}

export default GameModal;
