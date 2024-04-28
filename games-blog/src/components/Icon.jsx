import PropTypes from 'prop-types';

Icon.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

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