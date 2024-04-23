async function getAllGames(setVideogames, setIsEmpty, setError, setLoading) {
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        let gameList = await fetch('http://localhost:22107/posts');
        if (!gameList.ok) {
            throw new Error('Failed to fetch data');
        }
        let json_list = await gameList.json();
        setVideogames(json_list);
        setIsEmpty(json_list.length === 0);
    } catch (error) {
        setError(true);
    } finally {
        setLoading(false);
    }
}

export {getAllGames}