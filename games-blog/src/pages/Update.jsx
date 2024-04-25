import { useEffect, useState } from 'react';
import Empty from '@components/Empty';
import Loading from '@components/Loading';
import NoResponse from '@components/NoResponse';
import { getAllGames, updateGame } from '@controller/postController';

function UpdateForm({ games, handleSelectionChange, handleChange, handleSubmit, selection, successMessage, formData }) {
    return (
        <div className="formContainer">

            <form onSubmit={handleSubmit}>

                <h1 style={{ textAlign: "center" }}>
                    Update a recommendation
                </h1>
                <label htmlFor="gameToUpdate">Select the game to be deleted:</label>
                <br />

                <select
                    className="selectStyle"
                    id="gameToUpdate"
                    name="gameToUpdate"
                    value={selection}
                    onChange={handleSelectionChange}>

                    {games.map((game, index) => (
                        <option

                            value={game.id}
                            key={index}>
                            {game.title}
                        </option>

                    ))}
                </select>

                <br />

                <label htmlFor="title">Game title:</label>
                <br />
                <input
                    className="inputStyle"
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="description">Game description:</label>
                <br />
                <input
                    className="inputStyle"
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="genre">Game genre:</label>
                <br />
                <input
                    className="inputStyle"
                    type="text"
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="platform">Main Platform:</label>
                <br />
                <select
                    className="selectStyle"
                    id="platform"
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}>
                    <option value="PC">PC</option>
                    <option value="Nintendo">Nintendo</option>
                    <option value="PlayStation">PlayStation</option>
                    <option value="Xbox">Xbox</option>
                </select>

                <br />
                <label htmlFor="multiplayerSupport">Multiplayer Support:</label>
                <br />
                <select
                    className="selectStyle"
                    id="multiplayerSupport"
                    name="multiplayerSupport"
                    value={formData.multiplayerSupport}
                    onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <br />
                <label htmlFor="onlineFeatures">Online Features:</label>
                <br />
                <select
                    className="selectStyle"
                    id="onlineFeatures"
                    name="onlineFeatures"
                    value={formData.onlineFeatures}
                    onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <br />
                <br />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button type="submit">Update</button>
                    {successMessage && <p style={{ marginLeft: '10px' }}>{successMessage}</p>}
                </div>

            </form>

        </div>
    )
}

function Update() {

    const [videogames, setVideogames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [selection, setSelection] = useState();
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        platform: '',
        multiplayerSupport: '',
        onlineFeatures: '',
    });

    const handleSelectionChange = (e) => {
        setSelection(e.target.value)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateGame(
                selection,
                formData.title,
                formData.description,
                formData.genre,
                formData.platform,
                formData.multiplayerSupport === 'true', // Convert string to boolean
                formData.onlineFeatures === 'true' // Convert string to boolean
            );
            console.log('Game Updated:', response);
            setSuccessMessage('Successfully updated game!');
            // Optionally, reset form fields after successful submission
            getAllGames(setVideogames, setIsEmpty, setError, setLoading)

        } catch (error) {
            console.error('Error creating game:', error);
            setSuccessMessage('Something went wrong. Game was not updated!');
            // Handle error
        }
    };

    useEffect(() => {
        getAllGames(setVideogames, setIsEmpty, setError, setLoading);

    }, []);

    useEffect(() => {
        if (videogames.length > 0) {
            setSelection(videogames[0].id);

        }

    }, [videogames])

    useEffect(() => {
        if (selection) {

            let filteredGame = videogames.filter(game => game.id == selection)

            let selectedGame = filteredGame[0]
            setFormData({
                title: selectedGame.title,
                description: selectedGame.game_description,
                genre: selectedGame.genre,
                platform: selectedGame.main_platform,
                multiplayerSupport: !!selectedGame.multiplayer_support,
                onlineFeatures: !!selectedGame.online_features
            })

        }
    }, [selection])

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
        <UpdateForm
            games={videogames}
            handleSelectionChange={handleSelectionChange}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
            selection={selection}
            successMessage={successMessage} />
    )
}

export default Update