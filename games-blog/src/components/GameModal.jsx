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
                <button onClick={onClose} className='modal-Button'>X</button>
                <br/>
                <h1 className='titleWithLine'>{game.title}</h1>
                <h2> Main genre: <p className='normalText'>{game.genre}</p></h2>
                <h3> Main Platform: <p className='normalText'>{game.main_platform}</p></h3>
                <h4 className='styledText'> 
                    { game.multiplayer_support ? 
                        'You can play this game with friends locally' 
                        : 
                        'You can only play on singleplayer locally' 
                    }
                </h4>

                <h4 className='styledText'>
                    { game.online_features ? 
                        'This game has online features including multiplayer' 
                        : 
                        'The game does not have online features' }
                </h4>

                <h4>Description:</h4>
                <p>{game.game_description}</p>
            </div>
        </div>
    );
}

export default GameModal;
