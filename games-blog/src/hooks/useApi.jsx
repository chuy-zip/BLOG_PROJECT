import { useState, useEffect, createContext, useContext, Children } from 'react'

import { getAllGames, createGame, updateGame, deleteGame } from '@controller/postController'

import { getLoginToken, signInUser } from '@controller/userController'

const ApiContext = createContext({ games: [], useApi: () => { } })

const ApiProvider = ({ children }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGames()
    }, [])

    const getGames = async () => {
        const data = await getAllGames()
        setGames(data)
    }

    const addGame = async (title, gameDescription, genre, mainPlatform, multiplayerSupport, onlineFeatures, token) => {
        return await createGame(title, gameDescription, genre, mainPlatform, multiplayerSupport, onlineFeatures, token)
    }

    const changeGame = async (id, title, gameDescription, genre, mainPlatform, multiplayerSupport, onlineFeatures, token) => {
        return await updateGame(id, title, gameDescription, genre, mainPlatform, multiplayerSupport, onlineFeatures, token)
    }

    const removeGame = async (id, token) => {
        return await deleteGame(id, token)
    }

    const login = async (username, password) => {
        return getLoginToken(username, password)
    }

    const signIn = async (username, email, password) => {
        return signInUser(username, email, password)
    }

    return (
        <ApiContext.Provider 
            value={{
                games,
                setGames,
                addGame,
                changeGame,
                removeGame,
                login,
                signIn
            }}>

            {children}
        </ApiContext.Provider>
    )
}

const useApi = () => {
    return useContext(ApiContext)
}

export default useApi
export { ApiContext, ApiProvider }