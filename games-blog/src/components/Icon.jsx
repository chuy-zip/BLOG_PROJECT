function Icon({imgSrc, url}){
    return (
        <figure  >
            <img 
                src={imgSrc} 
                alt="Icon" 
                href = {url}
                className="clickableIcon"/> 
        </figure>
    );
}

export default Icon