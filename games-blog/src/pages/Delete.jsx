import { useState, useEffect } from 'react'
import { getAllGames } from '@controller/postController.jsx';
import Empty from '@components/Empty';
import Loading from '@components/Loading';
import NoResponse from '@components/NoResponse';

function DeleteForm({ games, handleChange, handleSubmit, selection }) {
    return (
        <div className="formContainer">

            <form onSubmit={handleSubmit}>
                <h1 style={{ textAlign: "center" }}>
                    Delete a reccomendation
                </h1>

                <label htmlFor="delete">Select the game to be deleted:</label>
                <br />

                <select
                    className="selectStyle"
                    id="platform"
                    name="platform"
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
                <button type="submit">Delete</button>

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

    const handleChange = (e) => {
        setSelection(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(selection)
        } catch (error) {
            console.error('Error creating game:', error);
            setSuccessMessage('Something went wrong. Game was not added!');
        }
    };


    useEffect(() => {
        getAllGames(setVideogames, setIsEmpty, setError, setLoading);
        console.log(videogames)
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
            selection={selection}/>
    )
}

export default Delete