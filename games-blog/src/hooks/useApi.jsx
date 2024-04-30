import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'; 

import { getAllGames, createGame, updateGame, deleteGame } from '@controller/postController'

import { getLoginToken, signInUser } from '@controller/userController'

const ApiContext = createContext({ games: [], useApi: () => { } })

const ApiProvider = ({ children }) => {

    const getGames = async (setVideogames, setIsEmpty, setError, setLoading, setNoAuth, token) => {
        await getAllGames(setVideogames, setIsEmpty, setError, setLoading, setNoAuth, token)
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
                getGames,
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

ApiProvider.propTypes = {
    children: PropTypes.node 
};

const useApi = () => {
    return useContext(ApiContext)
}

export default useApi
export { ApiContext, ApiProvider }