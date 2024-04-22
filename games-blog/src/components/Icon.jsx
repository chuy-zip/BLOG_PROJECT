function Icon({imgSrc, url}){
    return (<figure>
            <a href = {url}>
                <img src={imgSrc} alt="Icon" className="clickableIcon" />
            </a> 
        </figure>
    );
}

export default Icon