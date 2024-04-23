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

export default GameCard