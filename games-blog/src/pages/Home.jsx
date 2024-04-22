import '@style/Home.css'
import { useState, useEffect } from 'react'

function GameProperties({mainPlatform, multiplayerSupport, onlineFeatures}){

    return (
        <table style={{margin: 'auto', textAlign: 'center', paddingTop: '10px'}}>
            <thead>
                <tr>
                    <th style={{ fontSize: '12px' }}>Platform</th>
                    <th style={{ paddingLeft: '35px', paddingRight: '35px', fontSize: '12px' }}>Multiplayer</th>
                    <th style={{ fontSize: '12px' }}>Online</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ fontSize: '12px' }}>{mainPlatform}</td>
                    <td style={{ fontSize: '12px' }}>{multiplayerSupport ? 'Yes' : 'No'}</td>
                    <td style={{ fontSize: '12px' }}>{onlineFeatures ? 'Yes' : 'No'}</td>
                </tr>

            </tbody>

        </table>
    )

}


function GameCard({title, genre, gameDescription, mainPlatform, multiplayerSupport, onlineFeatures}){

    return (
        <div>
            <div className="gameCardContainer">
                <div className="cardHeader"> 
                    <h2>{title}</h2>
                    <h4>{genre}</h4>
                </div>
                <GameProperties mainPlatform={mainPlatform} multiplayerSupport={multiplayerSupport} onlineFeatures={onlineFeatures}/>
                <p style={{paddingLeft: '12px'}}> {gameDescription}</p>
            </div>
            
        </div>
    )
}



function Games({ games }) {

    return (
        <div className="gamesContainer">
            {games.map((game, index) => (
            <GameCard
                key={index}
                title={game.title}
                genre={game.genre}
                gameDescription={game.game_description}
                mainPlatform={game.main_platform}
                multiplayerSupport={game.multiplayer_support}
                onlineFeatures={game.online_features}
                />))}
        </div>
    );
}

function Empty() {
    return (
        <div className="gamesContainer">
            <h1 style={{ margin: 'auto', color: '#dbdfde' }}>🌀 Currently we don't have recommended games</h1>;
        </div>
    )
}

function Loading() {
    return (
        <div className="gamesContainer">
            <div className="loader" style={{ margin: 'auto' }}></div>
        </div>
    )
}

function NoResponse() {
    return (
        <div className="gamesContainer">
            <h1 style={{ textAlign: 'center', color: '#dbdfde' }}>🌀 Something went wrong... try again later</h1>;
        </div>
    )
}

function Home() {
    const [videogames, setVideogames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);


    async function videogameApi() {
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

    useEffect(() => {
        videogameApi();
    }, []);

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
        <div>
            <Games games={videogames} />    
        </div>
    );
}

export default Home