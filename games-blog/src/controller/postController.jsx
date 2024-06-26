async function getAllGames(setVideogames, setIsEmpty, setError, setLoading, setNoAuth, token) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    let gameList = await fetch('http://localhost:12107/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!gameList.ok) {
      if (gameList.status === 401){
        setNoAuth(true)
        return
      } else {
        throw new Error('Failed to fetch data');
      }
    }
    let json_list = await gameList.json();
    setVideogames(json_list);
    setIsEmpty(json_list.length === 0);
    setNoAuth(false)
  } catch (error) {
    setError(true);
  } finally {
    setLoading(false);
  }
}

async function createGame(title, gameDescription, genre, mainPlatform, multiplayerSupport, onlineFeatures, token) {
  try {
    const response = await fetch('http://localhost:12107/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        gameDescription,
        genre,
        mainPlatform,
        multiplayerSupport,
        onlineFeatures,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create game');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating game:', error.message);
    throw error;
  }
}

async function updateGame(id, title, gameDescription, genre, mainPlatform, multiplayerSupport, onlineFeatures, token) {
  try {
    const response = await fetch(`http://localhost:12107/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        gameDescription,
        genre,
        mainPlatform,
        multiplayerSupport,
        onlineFeatures,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create game');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating game:', error.message);
    throw error;
  }
}

async function deleteGame(id, token){
  try {
    const response = await fetch(`http://localhost:12107/posts/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })

    if (!response.ok) {
      throw new Error('Failed to delete game');
    }

  } catch (error) {
      console.error('Failed to delete game: ' + error.message);
      throw error;
  }
}

export { getAllGames, createGame, updateGame, deleteGame }