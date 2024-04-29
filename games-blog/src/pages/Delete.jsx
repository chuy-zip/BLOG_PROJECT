import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import useToken from '@hooks/useToken';
import useApi from '@hooks/useApi';

import Empty from '@components/Empty';
import Loading from '@components/Loading';
import NoResponse from '@components/NoResponse';

DeleteForm.propTypes = {
    games: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    selection: PropTypes.number,
    successMessage: PropTypes.string.isRequired
};

function DeleteForm({ games, handleChange, handleSubmit, selection, successMessage }) {
    return (
        <div className="formContainer">

            <form onSubmit={handleSubmit}>
                <h1 style={{ textAlign: "center" }}>
                    Delete a reccomendation
                </h1>

                <label htmlFor="gameToDelete">Select the game to be deleted:</label>
                <br />

                <select
                    className="selectStyle"
                    id="gameToDelete"
                    name="gameToDelete"
                    value={selection}
                    onChange={handleChange}>

                    {games.map((game, index) => (
                        <option
                            value={game.id}
                            key={index}>
                            {game.title}
                        </option>

                    ))}
                </select>

                <br />
                <br />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button type="submit">Delete</button>
                    {successMessage && <p style={{ marginLeft: '10px' }}>{successMessage}</p>}
                </div>


            </form>

        </div>
    )
}

function Delete() {

    const [videogames, setVideogames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [selection, setSelection] = useState();
    const [successMessage, setSuccessMessage] = useState('');
    const { token } = useToken() 
    const { getGames, removeGame} = useApi()

    const handleChange = (e) => {
        setSelection(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            removeGame(selection, token)
            setSuccessMessage('Succesfully deleted game')
            getGames(setVideogames, setIsEmpty, setError, setLoading, token);
        } catch (error) {
            console.error('Error creating game:', error);
            setSuccessMessage('Something went wrong. Game was not added!');
        }
    };


    useEffect(() => {
        getGames(setVideogames, setIsEmpty, setError, setLoading, token);
    }, []);

    useEffect(() => {

        if (videogames.length > 0) {
            setSelection(videogames[0].id);
        }
    }, [videogames]);

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
        <DeleteForm
            games={videogames}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            selection={selection}
            successMessage={successMessage} />
    )
}

export default Delete